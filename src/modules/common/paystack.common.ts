import axios from "axios";
import { IncomingHttpHeaders } from "http";
import crypto from "crypto";
import { IPaystackTransactionInitializationResponse, IPaystackTransactionVerificationResponse } from "../../types";

export class Paystack {
  private static readonly baseUrl = "https://api.paystack.co";
  private static readonly paystackSecret = process.env.PAYSTACK_SECRET_KEY!;
  private static readonly paystackPK = process.env.PAYSTACK_PUBLIC_KEY!;
  private static readonly headers = {
    Authorization: `Bearer ${this.paystackSecret}`,
    "Content-Type": "application/json",
  };

  static async verifyPayment(reference: string): Promise<IPaystackTransactionVerificationResponse> {
    const path = `/transaction/verify/${reference}`;
    const { data } = await axios.get(this.baseUrl + path, { headers: this.headers });
    return data;
  }

  static async initializeTransaction(payload: {
    amount: number;
    email: string;
    currency_code: string;
    transaction_ref: string;
  }): Promise<IPaystackTransactionInitializationResponse> {
    const path = `/transaction/initialize`;
    const resp = await axios.post(
      this.baseUrl + path,
      {
        amount: payload.amount,
        email: payload.email,
        reference: payload.transaction_ref,
        currency: payload.currency_code,
      },
      { headers: this.headers },
    );
    return resp.data;
  }

  static verifySignature(headers: IncomingHttpHeaders, event: any) {
    const hash = crypto.createHmac("sha512", this.paystackSecret).update(JSON.stringify(event)).digest("hex");
    return hash === headers["x-paystack-signature"];
  }

  static getPublicKey() {
    return this.paystackPK;
  }
}
