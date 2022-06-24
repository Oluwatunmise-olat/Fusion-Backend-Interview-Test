import express from "express";
import { AuthMiddleware as authMiddleware, RequestBodyDataMiddleware as requestValidator } from "../middlewares";
import { AccountController as accountController, AccountValidator as accountValidator } from "../modules/accounts";

const router = express.Router();

router.get("/transactions", authMiddleware.authenticate, accountController.getTransactions);
router.post(
  "/fund",
  authMiddleware.authenticate,
  requestValidator.validate(accountValidator.schema()),
  accountController.fund,
);
router.post(
  "/fund/initialize",
  authMiddleware.authenticate,
  requestValidator.validate(accountValidator.schema()),
  accountController.initializeFundingTransaction,
);
router.post("/transfer", authMiddleware.authenticate, accountController.performTransfer);
router.post("/webhook", accountController.paystackWebhook);
router.get("/balance", authMiddleware.authenticate, accountController.getBalance);
router.get("", accountController.getAll);

export default router;
