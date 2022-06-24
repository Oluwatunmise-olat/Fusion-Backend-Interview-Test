import { Request } from "express";

export interface IResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface IErrorResponse extends IResponse {
  data: Array<{ message: string }>;
}

export interface IServiceResponse {
  hasError: boolean;
  message: string;
  data: any;
}

export interface IRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export interface IJwtPayload {
  email: string;
  userId: number;
}

export interface IPaystackTransactionVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: null;
    gateway_response: string;
    paid_at: Date;
    created_at: Date;
    channel: string;
    currency: string;
    fees: number;
    requested_amount: number;
    transaction_date: Date;
  };
}

export interface IPaystackTransactionInitializationResponse {
  access_code: string;
  authorization_url: string;
  reference: string;
}
