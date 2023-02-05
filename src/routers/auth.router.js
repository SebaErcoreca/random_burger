import express from "express";
import * as authController from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

export default authRouter;