import express from "express";
import {
  BeneficiariesController as beneficiaryController,
  BeneficiariesValidator as beneficiaryValidator,
} from "../modules/beneficiaries";
import { RequestBodyDataMiddleware as requestValidator } from "../middlewares";
import { AuthMiddleware as authMiddleware } from "../middlewares";

const router = express.Router();

router.post(
  "/add",
  authMiddleware.authenticate,
  requestValidator.validate(beneficiaryValidator.schema()),
  beneficiaryController.add,
);
router.delete(
  "/remove",
  authMiddleware.authenticate,
  requestValidator.validate(beneficiaryValidator.schema()),
  beneficiaryController.remove,
);
router.get("", authMiddleware.authenticate, beneficiaryController.getAll);

export default router;
