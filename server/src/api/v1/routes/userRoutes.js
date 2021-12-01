import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getUserInfo } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter
  /**
   * @desc get user information
   * @router api/user/info
   * @access Private
   */
  .get(
    "/info",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(getUserInfo)
  );

export default userRouter;
