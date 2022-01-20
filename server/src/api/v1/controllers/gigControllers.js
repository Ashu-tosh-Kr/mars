import Gig from "../models/gigModel.js";
import Joi from "joi";
import Client from "../models/clientModel.js";
import GigStatus from "../models/gigStatusModel.js";
import User from "../models/userModel.js";
import { sendMail } from "../helpers/sendMail.js";
import { addCalEvent, updateCalEvent } from "../helpers/gCal.js";

export const getAllGigs = async (req, res) => {
  const gigs = await Gig.find().populate(["client", "talent", "currentStatus"]);
  res.json({ message: "Successful", data: gigs });
};

export const addGig = async (req, res) => {
  const {
    galId,
    gigTitle,
    clientId,
    talentId,
    gigType,
    gigStart,
    gigEnd,
    embargo,
    gigLocation,
    gigAddress,
    gigPostalCode,
    gigArrive,
    gigGoHome,
    gigScheduleDetail,
    gigAssistantId,
    gigDetails,
    gigHost,
    caution,
    dressCode,
    whatToBring,
    gigPeopleCount,
    gigPeopleName,
    promotion,
    carParking,
    interviewQuestions,
    dvd,
    photoShoot,
    autograph,
    food,
    other,
    memo,
  } = req.body;
  const client = await Client.findById(clientId);
  const talent = await User.findOne({ _id: talentId, role: 0 });
  const gig = await Gig.findOne({ galId });

  //validations
  if (!client) {
    res.status(404);
    throw new Error("Client Doesn't Exist");
  }
  if (!talent) {
    res.status(404);
    throw new Error("Talent Doesn't Exist");
  }
  if (gig) {
    res.status(403);
    throw new Error("Gig with this galId already already Exist");
  }
  const validation = Joi.object({
    galId: Joi.string()
      .required()
      .regex(/(\d{2}(0[1-9]|1[0-2])(\d{2}[1-9]))/),
  }).validate(req.body, { abortEarly: false, allowUnknown: true });
  if (validation.error) {
    res.status(400);
    throw new Error(validation.error);
  }

  const draftStatus = await GigStatus.findOne({ step: 1 });

  const newGig = new Gig({
    galId,
    gigTitle,
    client: clientId,
    talent: talentId,
    currentStatus: draftStatus._id,
    currentAssignee: req.user._id,
    gigType,
    gigStart,
    gigEnd,
    embargo,
    gigLocation,
    gigAddress,
    gigPostalCode,
    gigArrive,
    gigGoHome,
    gigScheduleDetail,
    gigDetails,
    gigHost,
    caution,
    dressCode,
    whatToBring,
    gigPeopleCount: +gigPeopleCount,
    gigPeopleName,
    promotion,
    carParking,
    interviewQuestions,
    dvd,
    photoShoot,
    autograph,
    food,
    other,
    memo,
  });
  if (gigAssistantId) {
    newGig.gigAssistant = gigAssistantId;
  }
  await newGig.save();

  const currUser = await User.findById(req.user._id);
  currUser.todos.push(newGig);
  await currUser.save();

  res.json({
    message: "Successful",
    data: newGig,
  });
};

export const editGig = async (req, res) => {
  const {
    galId,
    gigTitle,
    clientId,
    talentId,
    gigType,
    gigStart,
    gigEnd,
    embargo,
    gigLocation,
    gigAddress,
    gigPostalCode,
    gigArrive,
    gigGoHome,
    gigScheduleDetail,
    gigAssistantId,
    gigDetails,
    gigHost,
    caution,
    dressCode,
    whatToBring,
    gigPeopleCount,
    gigPeopleName,
    promotion,
    carParking,
    interviewQuestions,
    dvd,
    photoShoot,
    autograph,
    food,
    other,
    memo,
  } = req.body;
  const gig = await Gig.findById(req.params.gigId).populate("currentStatus");
  const client = await Client.findById(clientId);
  const talent = await User.findOne({ _id: talentId, role: 0 });

  //validations
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (clientId && gig.client !== clientId && !client) {
    res.status(404);
    throw new Error("Client Doesn't Exist");
  }
  if (!talent && gig.talent !== talent) {
    res.status(404);
    throw new Error("Talent Doesn't Exist");
  }
  const validation = Joi.object({
    galId: Joi.string().regex(/(\d{2}(0[1-9]|1[0-2])(\d{2}[1-9]))/),
  }).validate(req.body, { abortEarly: false, allowUnknown: true });
  if (validation.error) {
    res.status(400);
    throw new Error(validation.error);
  }

  gig.galId = galId || gig.galId;
  gig.gigTitle = gigTitle || gig.gigTitle;
  gig.client = clientId || gig.client;
  gig.talent = talentId || gig.talent;
  gig.gigType = gigType || gig.gigType;
  gig.gigStart = gigStart || gig.gigStart;
  gig.gigEnd = gigEnd || gig.gigEnd;
  gig.embargo = embargo || gig.embargo;
  gig.gigLocation = gigLocation || gig.gigLocation;
  gig.gigAddress = gigAddress || gig.gigAddress;
  gig.gigPostalCode = gigPostalCode || gigPostalCode;
  gig.gigArrive = gigArrive || gig.gigArrive;
  gig.gigGoHome = gigGoHome || gig.gigGoHome;
  gig.gigScheduleDetail = gigScheduleDetail || gig.gigScheduleDetail;
  gig.gigAssistant = gigAssistantId || gig.gigAssistant;
  gig.gigDetails = gigDetails || gig.gigDetails;
  gig.gigHost = gigHost || gig.gigHost;
  gig.caution = caution || gig.caution;
  gig.dressCode = dressCode || gig.dressCode;
  gig.whatToBring = whatToBring || gig.whatToBring;
  gig.gigPeopleCount = +gigPeopleCount || gig.gigPeopleCount;
  gig.gigPeopleName = gigPeopleName || gig.gigPeopleName;
  gig.promotion = promotion || gig.promotion;
  gig.carParking = carParking || gig.carParking;
  gig.interviewQuestions = interviewQuestions || gig.interviewQuestions;
  gig.dvd = dvd || gig.dvd;
  gig.photoShoot = photoShoot || gig.photoShoot;
  gig.autograph = autograph || gig.autograph;
  gig.food = food || gig.food;
  gig.other = other || gig.other;
  gig.memo = memo || gig.memo;

  await gig.save();

  if (gig.gCalEventId) {
    updateCalEvent(gig);
  }

  res.json({ message: "Successful", data: gig });
};

/**
 * GIG Lifecycle controllers: Step 0 through Step 11
 */
export const completeStepOne = async (req, res) => {
  const { newAssigneeId } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);

  //validations
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("SV to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }

  const nextGigStatus = await GigStatus.findOne({ step: 2 });
  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepTwo = async (req, res) => {
  const { newAssigneeId, isApproved } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);

  //validations
  if (req.user._id.toString() !== gig.currentAssignee._id.toString()) {
    res.status(401);
    throw new Error("Access denied, Gig not assigned to the current user");
  }
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("Employee to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  let nextGigStatus;
  if (isApproved) {
    nextGigStatus = await GigStatus.findOne({ step: 3 });
  } else {
    nextGigStatus = await GigStatus.findOne({ step: 1 });
  }
  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepThree = async (req, res) => {
  const { newAssigneeId } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);

  //validations
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("SV to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }

  const nextGigStatus = await GigStatus.findOne({ step: 4 });
  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepFour = async (req, res) => {
  const { newAssigneeId, isApproved } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);

  //validations
  if (req.user._id.toString() !== gig.currentAssignee._id.toString()) {
    res.status(401);
    throw new Error("Access denied, Gig not assigned to the current user");
  }
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("CEO to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  let nextGigStatus;
  if (isApproved) {
    nextGigStatus = await GigStatus.findOne({ step: 5 });
  } else {
    nextGigStatus = await GigStatus.findOne({ step: 3 });
  }
  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepFive = async (req, res) => {
  const { newAssigneeId, isApproved } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);
  const talent = await User.findOne({ _id: gig.talent._id, role: 0 });
  //validations
  // if (req.user._id !== gig.currentAssignee._id) {
  //   res.status(401);
  //   throw new Error("Access denied, Gig not assigned to the current user");
  // }
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("CEO to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  let nextGigStatus;
  if (isApproved) {
    nextGigStatus = await GigStatus.findOne({ step: 6 });
    addCalEvent(gig, talent);
  } else {
    nextGigStatus = await GigStatus.findOne({ step: 4 });
  }
  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  talent.todos.push(gig);
  await talent.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");
  sendMail(talent.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepSixThroughNine = async (req, res) => {
  const { newAssigneeId } = req.body;
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);
  const newAssignee = await User.findById(newAssigneeId);

  //validations
  // if (req.user._id !== gig.currentAssignee._id) {
  //   res.status(401);
  //   throw new Error("Access denied, Gig not assigned to the current user");
  // }
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  if (!newAssigneeId) {
    res.status(403);
    throw new Error("User to be assigned not specified");
  }
  if (!newAssignee) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  const currGigStatus = await GigStatus.findById(gig.currentStatus);
  const nextGigStatus = await GigStatus.findOne({
    step: currGigStatus.step + 1,
  });

  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  gig.currentAssignee = newAssignee;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  newAssignee.todos.push(gig);
  await newAssignee.save();

  sendMail(newAssignee.email, "https://mars.com/todos", "New Todo");

  res.json({
    message: "Success",
    data: gig,
  });
};

export const completeStepTen = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);
  const currUser = await User.findById(req.user._id);

  //validations
  // if (req.user._id !== gig.currentAssignee._id) {
  //   res.status(401);
  //   throw new Error("Access denied, Gig not assigned to the current user");
  // }
  if (!gig) {
    res.status(404);
    throw new Error("Gig doesn't Exist");
  }
  const nextGigStatus = await GigStatus.findOne({
    step: 11,
  });

  gig.statusLifecycle.push({
    status: gig.currentStatus,
    personInCharge: req.user._id,
    completionDate: Date.now(),
  });
  gig.currentStatus = nextGigStatus;
  await gig.save();

  currUser.todos = currUser.todos.filter(
    (todo) => todo.toString() !== gig._id.toString()
  );
  await currUser.save();

  res.json({
    message: "Success",
    data: gig,
  });
};
