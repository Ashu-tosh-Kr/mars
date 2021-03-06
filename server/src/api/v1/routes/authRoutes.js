import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  changePass,
  forgotPassword,
  getAccessToken,
  login,
  register,
  resetPassword,
} from "../controllers/authControllers.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter
  /**
   * @desc register
   * @route api/auth/register
   * @access Public
   */
  .post(
    "/register",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(isAdmin),
    expressAsyncHandler(register)
  )
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
  .post("/refresh_token", expressAsyncHandler(getAccessToken))
  /**
   * @desc change password
   * @route api/auth/change_pass
   * @access Private
   */
  .post(
    "/change_pass",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(changePass)
  )
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
