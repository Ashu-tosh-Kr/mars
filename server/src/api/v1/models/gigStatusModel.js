import mongoose from "mongoose";

const gigStatusSchema = new mongoose.Schema({
  step: Number,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  personInChargeRole: {
    type: Number,
    required: true,
  },
});
const GigStatus = mongoose.model("GigStatus", gigStatusSchema);
export default GigStatus;
