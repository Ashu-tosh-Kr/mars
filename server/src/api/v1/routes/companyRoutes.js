import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addCompany,
  getAllCompanies,
} from "../controllers/companyControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const companyRouter = Router();

companyRouter
  /**
   * @desc get company list
   * @router api/company/
   * @access Private
   */
  .get(
    "/",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(getAllCompanies)
  )
  /**
   * @desc add company
   * @router api/company/
   * @access Private
   */
  .post("/", expressAsyncHandler(verifyToken), expressAsyncHandler(addCompany));

export default companyRouter;
