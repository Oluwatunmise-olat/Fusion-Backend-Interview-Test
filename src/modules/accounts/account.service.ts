import { QueryRunner } from "typeorm";
import { DBSource } from "../../db/data-source";
import { Account, Beneficiary, Currency, Transaction, User } from "../../db/entities";
import { IServiceResponse } from "../../types";
import { BodyFieldError, ServerError } from "../common/exception-handlers.common";
import crypto from "crypto";
import { Paystack as paystack } from "../common/paystack.common";
import axios from "axios";
import { IncomingHttpHeaders } from "http";
export class AccountService {
  private static accountRepository = DBSource.getRepository(Account);
  private static transactionRepository = DBSource.getRepository(Transaction);
  private static beneficiaryRepository = DBSource.getRepository(Beneficiary);
  private static currencyRepository = DBSource.getRepository(Currency);
  private static readonly queryRunner = DBSource.createQueryRunner();

  static async create(payload: { userId: number; currencyId: number }, connection: QueryRunner): Promise<IServiceResponse> {
    try {
      const tempAccRepository = connection.manager.getRepository(Account);
      const unsavedAccount = tempAccRepository.create({
        user: { id: payload.userId },
        currency: { id: payload.currencyId },
      });
      const account = await tempAccRepository.save(unsavedAccount);
      return { hasError: false, message: "Success", data: account };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async getAll(): Promise<IServiceResponse> {
    try {
      const data = await this.accountRepository.query(
        `SELECT 
        type, email, last_name, first_name, 
        currencies.name as currency_name, 
        currencies.code as currency_code, 
        currencies.symbol as currency_symbol 
        FROM accounts 
        JOIN users 
        ON users.id=user_id 
        JOIN currencies 
        ON currencies.id=currency_id`,
      );
      // add pagination
      return { hasError: false, message: "Success", data: { count: data.length, accounts: data } };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async getTransactions(userId: number): Promise<IServiceResponse> {
    try {
      const [data, count] = await this.transactionRepository.findAndCount({ where: { account: { user: { id: userId } } } });
      return { hasError: false, message: "Success", data: { count, transactions: data } };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async verifyTransaction(
    payload: { amount: string; transaction_ref: string; description: string },
    userId: number,
  ): Promise<IServiceResponse> {
    try {
      await this.queryRunner.connect();
      const tempTransactionRepository = this.queryRunner.manager.getRepository(Transaction);
      await this.queryRunner.startTransaction();

      const pendingTransaction = await tempTransactionRepository.findOne({
        where: { reference: payload.transaction_ref, account: { user: { id: userId } }, amount: parseInt(payload.amount) },
      });

      if (!pendingTransaction)
        return { hasError: true, message: "Resource Not Found", data: { message: "Invalid reference Id" } };

      const paystackResp = await paystack.verifyPayment(payload.transaction_ref);

      if (paystackResp.data.status === "failed" || paystackResp.data.amount !== parseInt(payload.amount) / 0.01) {
        const unsavedTrans = tempTransactionRepository.create({ ...pendingTransaction, status: "cancelled" });
        await tempTransactionRepository.save(unsavedTrans);

        return { hasError: true, message: "Transaction Failed", data: {} };
      }
      const unsavedTrans = tempTransactionRepository.create({ ...pendingTransaction, status: "successful" });
      await tempTransactionRepository.save(unsavedTrans);

      await this.queryRunner.commitTransaction();

      return { hasError: false, message: "Transaction Successful", data: {} };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      if (axios.isAxiosError(error)) {
        const errResponse = error.response?.data as unknown as { status: boolean; message: string };
        return { hasError: true, message: errResponse.message, data: {} };
      }
      throw new ServerError();
    }
  }

  static webhook(event: any, headers: IncomingHttpHeaders) {
    const requestFromPaystack = paystack.verifySignature(headers, event);
    if (!requestFromPaystack) return;
    // perform checks
    console.log(event);
    return;
  }

  static async transfer(payload: { email: string; description?: string; amount: string }, userId: number) {
    try {
      await this.queryRunner.connect();

      const tempBeneficiaryRepository = this.queryRunner.manager.getRepository(Beneficiary);
      const tempAccountRepository = this.queryRunner.manager.getRepository(Account);
      const tempTransactionRepository = this.queryRunner.manager.getRepository(Transaction);

      await this.queryRunner.startTransaction();

      let isBeneficiary = await tempBeneficiaryRepository.query(
        `SELECT * 
        FROM beneficiaries 
        INNER JOIN users u 
        ON u.id=target_id 
        WHERE u.email = ?
        AND source_id = ?
        `,
        [payload.email, userId],
      );

      isBeneficiary = isBeneficiary[0];

      if (!isBeneficiary) throw new BodyFieldError({ message: "Can only send to beneficiaries" }, "Transfer Failed");
      const userBalance = await this.getBalance(userId);

      if (userBalance.data.balance < parseInt(payload.amount))
        return new BodyFieldError({ message: "Insufficient Balance" }, "Transfer Failed");

      const [sourceAccount, targetAccount] = await Promise.all([
        tempAccountRepository.findOne({ where: { user: { id: userId } } }),
        tempAccountRepository.findOne({ where: { user: { email: payload.email } } }),
      ]);

      const transactionReferenceId = this.getTransferReferenceCode();

      const unsavedSourceTransaction = tempTransactionRepository.create({
        status: "successful",
        type: "transfer",
        gateway: "wallet",
        account: sourceAccount!,
        description: payload?.description,
        amount: parseInt(payload.amount) * -1,
        reference: transactionReferenceId,
      });

      const unsavedTargetTransaction = tempTransactionRepository.create({
        status: "successful",
        type: "credit",
        gateway: "wallet",
        account: targetAccount!,
        description: payload?.description,
        amount: parseInt(payload.amount),
        reference: transactionReferenceId,
      });

      await Promise.all([
        tempTransactionRepository.save(unsavedSourceTransaction),
        tempTransactionRepository.save(unsavedTargetTransaction),
      ]);

      await this.queryRunner.commitTransaction();

      return { hasError: false, message: "Transfer Success", data: {} };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      if (error instanceof BodyFieldError) {
        throw error;
      }
      throw new ServerError();
    }
  }

  static async getBalance(userId: number): Promise<IServiceResponse> {
    try {
      const userAccount = await this.accountRepository.findOne({
        where: { user: { id: userId } },
        relations: ["currency"],
      });
      let userBalance = await this.transactionRepository.query(
        `SELECT SUM(amount) as balance FROM transactions WHERE account_id=? AND status=?`,
        [userAccount?.id, "successful"],
      );
      userBalance = parseInt(userBalance[0]["balance"]);
      return {
        hasError: false,
        message: "Success",
        data: { balance: this.validBalance(userBalance) ? userBalance : 0, currency: userAccount?.currency },
      };
    } catch (error) {
      throw new ServerError();
    }
  }

  static async initializeTransaction(
    payload: { amount: string; description: string },
    userId: number,
    userEmail: string,
  ): Promise<IServiceResponse> {
    try {
      const transaction_ref = this.getTransferReferenceCode();
      const defaultCurrency = (await this.currencyRepository.findOne({ where: { code: "NGN" } }))!;
      const unsavedTransaction = await this.transactionRepository.create({
        gateway: "paystack",
        type: "credit",
        amount: parseInt(payload.amount),
        description: payload.description,
        reference: transaction_ref,
        currency: defaultCurrency,
        account: (await this.accountRepository.findOneBy({ user: { id: userId } }))!,
      });
      await this.transactionRepository.save(unsavedTransaction);
      const paystackResp = await paystack.initializeTransaction({
        currency_code: defaultCurrency.code,
        amount: parseInt(payload.amount) / 0.01,
        transaction_ref,
        email: userEmail,
      });
      return {
        hasError: false,
        message: "Success",
        data: { transaction_ref, currency: defaultCurrency, authorization_url: paystackResp.authorization_url },
      };
    } catch (error) {
      throw new ServerError();
    }
  }

  private static getTransferReferenceCode() {
    // make unique
    return crypto.randomUUID();
  }

  private static validBalance(amount: number) {
    return amount > 0;
  }
}
