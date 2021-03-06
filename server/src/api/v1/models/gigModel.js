import mongoose from "mongoose";
import Cost from "./costModel.js";

const completedStatusSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GigStatus",
  },
  personInCharge: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  completionDate: Date,
});

const moneySchema = new mongoose.Schema({
  tax: { type: Number, default: 10 },
  serviceFeeBeforeTax: Number,
  serviceFeeIncludingTax: Number,
  costCondition: Number | String,
  billableCost: Number | String,
  moneyNote: String,
  talentFeeBeforeTax: Number | String,
  talentFeeIncludingTax: Number,
  total: Number,
});

const gigSchema = new mongoose.Schema(
  {
    galId: {
      type: String,
      required: true,
      trim: true,
    },
    gigTitle: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    talent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    gigType: String,
    gigStart: Date,
    gigEnd: Date,
    embargo: Date,
    gigLocation: String,
    gigAddress: String,
    gigPostalCode: String,
    gigArrive: Date,
    gigGoHome: Date,
    gigScheduleDetail: {
      type: String,
    },
    gigAssistant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    gigDetails: String,
    gigHost: String,
    caution: String,
    dressCode: String,
    whatToBring: String,
    gigPeopleCount: Number,
    gigPeopleName: [
      {
        type: String,
      },
    ],
    promotion: String,
    carParking: String,
    interviewQuestions: [
      {
        type: String,
      },
    ],
    dvd: Boolean,
    photoShoot: String,
    autograph: String,
    food: String,
    other: String,
    costs: {
      type: [Cost.schema],
    },
    money: moneySchema,
    //meta data
    memo: String,
    currentAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentStatus: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "GigStatus",
    },
    statusLifecycle: {
      type: [completedStatusSchema],
    },
    gCalEventId: String,
  },
  {
    timestamps: true,
  }
);
// gigSchema.post("find", async function (gigs) {
// const arr = [];
// for (let gig of gigs) {
//   arr.push(gig.populate(["client", "talent", "currentStatus"]));
// }
// await Promise.all(arr);
// for (let gig of gigs) {
// await gig.populate("client");
// await gig.populate("talent", "-password");
// await gig.populate("currentStatus");
// gig.populate("currentAssignee", "-password"),
// await gig.populate("currentAssignee", "-password");
// await gig.populate({
//   path: "statusLifecycle",
//   populate: "personInCharge",
// });
// await gig.populate({
//   path: "statusLifecycle",
//   populate: "status",
// });
// }
// });

// gigSchema.post("save", async function (gig, next) {
// await gig.populate("client");
// await gig.populate("talent", "-password");
// await gig.populate("currentStatus");
// await gig.populate("currentAssignee", "-password");
// await gig.populate({
//   path: "statusLifecycle",
//   populate: "personInCharge",
// });
// await gig.populate({
//   path: "statusLifecycle",
//   populate: "status",
// });
// next();
// });
const Gig = mongoose.model("Gig", gigSchema);
export default Gig;
