import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addCost, delCost } from "../controllers/costControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const costRouter = Router();

costRouter
  /**
   * @desc add cost to gig
   * @route api/cost/gigId/add
   * @access Private
   */
  .patch(
    "/:gigId/add",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(addCost)
  )
  /**
   * @desc delete cost from gig
   * @route api/cost/gigId/del
   * @access Private
   */
  .patch(
    "/:gigId/del",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(delCost)
  );

export default costRouter;
