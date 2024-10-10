import express from "express";
import validate from "../../middlewares/validations.middlewares.js";
import { RegisterUserSchema, LoginUserSchema } from "../users/users.schema.js";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate({ bodySchema: RegisterUserSchema }),
  authController.register
);
router.post(
  "/login",
  validate({ bodySchema: LoginUserSchema }),
  authController.login
);

export default router;
