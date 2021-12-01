import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  forgotPassword,
  getAccessToken,
  login,
  register,
  resetPassword,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter
  /**
   * @desc register
   * @route api/auth/register
   * @access Public
   */
  .post("/register", expressAsyncHandler(register))
  /**
   * @desc login
   * @route api/auth/login
   * @access Public
   */
  .post("/login", expressAsyncHandler(login))
  /**
   * @desc refreshtoken
   * @route api/auth/refresh_token
   * @access Public
   */
  .get("/refresh_token", expressAsyncHandler(getAccessToken))
  /**
   * @desc forgot password
   * @router api/auth/forgot
   * @access Public
   */
  .post("/forgot", expressAsyncHandler(forgotPassword))
  /**
   * @desc reset password
   * @router api/auth/reset
   * @access Public
   */
  .post("/reset", expressAsyncHandler(resetPassword));

export default authRouter;
