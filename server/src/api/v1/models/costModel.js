import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  costCategory: { type: String, required: true },
  costDetail: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date },
});

const Cost = mongoose.model("Cost", costSchema);
export default Cost;
