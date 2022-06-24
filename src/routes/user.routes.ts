import express from "express";
import { UserController as userController, UserValidator as userValidator } from "../modules";
import { RequestBodyDataMiddleware as requestValidator, AuthMiddleware as authMiddleware } from "../middlewares";

const router = express.Router();

router.get("", userController.getAll);
router.post("/create", requestValidator.validate(userValidator.register()), userController.register);
router.post("/login", requestValidator.validate(userValidator.logIn()), userController.logIn);
router.get("/profile", authMiddleware.authenticate, userController.getProfile);

export default router;
