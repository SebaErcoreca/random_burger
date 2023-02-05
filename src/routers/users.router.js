import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/", userController.createUser)
usersRouter.get("/:email", auth, userController.getUser);

export default usersRouter;
