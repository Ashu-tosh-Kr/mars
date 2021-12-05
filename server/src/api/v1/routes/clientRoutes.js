import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addCLient,
  editClient,
  getAllClients,
} from "../controllers/clientControllers.js";
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
  .post("/", expressAsyncHandler(verifyToken), expressAsyncHandler(addCLient))
  /**
   * @desc update client
   * @router api/client/
   * @access Private
   */
  .put("/", expressAsyncHandler(verifyToken), expressAsyncHandler(editClient));

export default clientRouter;
