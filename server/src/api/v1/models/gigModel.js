import mongoose from "mongoose";

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
    status: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    type: String,
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
    arParking: String,
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
