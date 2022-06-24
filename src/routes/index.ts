import express from "express";
import userRoutes from "./user.routes";
import currencyRoutes from "./currency.routes";
import beneficiaryRoutes from "./beneficiaries.routes";
import accountRoutes from "./account.routes";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/currency", currencyRoutes);
router.use("/beneficiaries", beneficiaryRoutes);
router.use("/accounts", accountRoutes);

export default router;
