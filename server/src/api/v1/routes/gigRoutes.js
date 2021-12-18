import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addGig,
  editGig,
  getAllGigs,
  completeStepOne,
  completeStepTwo,
  completeStepThree,
} from "../controllers/gigControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const gigRouter = Router();

gigRouter
  /**
   * @desc get all gigs
   * @router api/gig/
   * @access Private
   */
  .get("/", expressAsyncHandler(verifyToken), expressAsyncHandler(getAllGigs))
  /**
   * @desc add new gig
   * @router api/gig/
   * @access Private
   */
  .post("/", expressAsyncHandler(verifyToken), expressAsyncHandler(addGig))
  /**
   * @desc edit one gig
   * @route api/gig/gigId
   * @access Private
   */
  .put(
    "/:gigId",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(editGig)
  )
  /**
   * @desc complete step one
   * @route api/gig/gigId/step-one
   * @access Private
   */
  .post(
    "/:gigId/step-one",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepOne)
  )
  /**
   * @desc complete step two
   * @route api/gig/gigId/step-two
   * @access Private
   */
  .post(
    "/:gigId/step-two",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepTwo)
  )
  .post(
    "/:gigId/step-three",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepThree)
  );

export default gigRouter;
