import { Request, Response } from "express";
import { Schema } from "mongoose";

export type NotificationType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED";

export interface INotification {
  userOid: string;
  title: string;
  message: string;
  read: boolean;
  source: string;
  timestamp: Date;
}
