import mongoose from "mongoose";

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
    currentStatus: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "GigStatus",
    },
    statusLifecycle: {
      type: [completedStatusSchema],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    gigType: String,
    talent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    gigStart: Date,
    gigEnd: Date,
    embargo: Date,
    gigLocation: String,
    gigAddress: String,
    gigArrive: Date,
    gigGoHome: Date,
    gigScheduleDetail: {
      type: String,
    },
    gigAssistant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    interviewQuestion: [
      {
        type: String,
      },
    ],
    dvd: Boolean,
    photoShoot: String,
    autograph: String,
    food: String,
    other: String,
  },
  {
    timestamps: true,
  }
);
const Gig = mongoose.model("Gig", gigSchema);
export default Gig;
