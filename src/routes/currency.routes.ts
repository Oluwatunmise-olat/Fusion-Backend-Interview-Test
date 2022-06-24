import express from "express";
import { CurrencyController as currencyController, CurrencyValidator as currencyValidator } from "../modules/currencies";
import { RequestBodyDataMiddleware as requestValidator, AuthMiddleware as authMiddleware } from "../middlewares";

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authenticate,
  requestValidator.validate(currencyValidator.create()),
  currencyController.create,
);

router.get("/:currencyId", currencyController.getOne);
router.get("", currencyController.getAll);

export default router;
