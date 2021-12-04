import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter company name"],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Please enter phone number"],
      trim: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Client = mongoose.model("Client", clientSchema);
export default Client;
