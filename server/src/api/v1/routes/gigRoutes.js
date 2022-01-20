import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addGig,
  editGig,
  getAllGigs,
  completeStepOne,
  completeStepTwo,
  completeStepThree,
  completeStepFour,
  completeStepFive,
  completeStepTen,
  completeStepSixThroughNine,
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
  /**
   * @desc complete step three
   * @route api/gig/gigId/step-three
   * @access Private
   */
  .post(
    "/:gigId/step-three",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepThree)
  )
  /**
   * @desc complete step four
   * @route api/gig/gigId/step-four
   * @access Private
   */
  .post(
    "/:gigId/step-four",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepFour)
  )
  /**
   * @desc complete step five
   * @route api/gig/gigId/step-five
   * @access Private
   */
  .post(
    "/:gigId/step-five",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepFive)
  )
  /**
   * @desc complete step six
   * @route api/gig/gigId/step-six
   * @access Private
   */
  .post(
    "/:gigId/step-six",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepSixThroughNine)
  )
  /**
   * @desc complete step seven
   * @route api/gig/gigId/step-seven
   * @access Private
   */
  .post(
    "/:gigId/step-seven",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepSixThroughNine)
  )
  /**
   * @desc complete step eight
   * @route api/gig/gigId/step-eight
   * @access Private
   */
  .post(
    "/:gigId/step-eight",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepSixThroughNine)
  )
  /**
   * @desc complete step nine
   * @route api/gig/gigId/step-nine
   * @access Private
   */
  .post(
    "/:gigId/step-nine",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepSixThroughNine)
  )
  /**
   * @desc complete step ten
   * @route api/gig/gigId/step-ten
   * @access Private
   */
  .post(
    "/:gigId/step-ten",
    expressAsyncHandler(verifyToken),
    expressAsyncHandler(completeStepTen)
  );

export default gigRouter;
