import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Account, BaseEntity, Currency } from ".";

@Entity({ name: "transactions" })
export class Transaction extends BaseEntity {
  @ManyToOne(() => Account, (account) => account.id, { onUpdate: "CASCADE", onDelete: "SET NULL" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal" })
  amount!: number;

  @ManyToOne(() => Currency, (currency) => currency.id, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @Column({
    type: "enum",
    enum: ["paystack", "flutterwave", "monnify"],
    enumName: "enum_transactions_gateway",
    default: "paystack",
  })
  gateway?: string;

  @Column({ type: "enum", enum: ["credit", "transfer"], enumName: "enum_transactions_type" })
  type!: string;

  @Column({
    enum: ["successful", "pending", "cancelled"],
    type: "enum",
    enumName: "enum_transactions_status",
    default: "pending",
  })
  status!: string;
}
