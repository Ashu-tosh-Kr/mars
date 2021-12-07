import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  editUser,
  getAllUsers,
  getUserInfo,
} from "../controllers/userControllers.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter
  /**
   * @desc get all users
   * @router api/user/
   * @access Private
   */
  .get("/", expressAsyncHandler(verifyToken), expressAsyncHandler(getAllUsers))
  /**
   * @desc get user information
   * @router api/user/info
   * @access Private
   */
  .get(
    "/info",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(getUserInfo)
  )
  /**
   * @desc edit one user
   * @route api/user/
   * @access Private
   */
  .put(
    "/",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(isAdmin),
    expressAsyncHandler(editUser)
  );

export default userRouter;
