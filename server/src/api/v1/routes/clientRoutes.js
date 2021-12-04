import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addCLient, getAllClients } from "../controllers/clientControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const clientRouter = Router();

clientRouter
  /**
   * @desc get client list
   * @router api/client/
   * @access Private
   */
  .get(
    "/",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(getAllClients)
  )
  /**
   * @desc add client
   * @router api/client/
   * @access Private
   */
  .post("/", expressAsyncHandler(verifyToken), expressAsyncHandler(addCLient));

export default clientRouter;
