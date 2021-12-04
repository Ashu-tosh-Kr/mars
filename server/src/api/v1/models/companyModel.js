import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter company name"],
      trim: true,
    },
    postCode: {
      type: String,
      required: [true, "Please enter postal code"],
      trim: true,
    },
    officeAddress: {
      type: String,
      required: [true, "Please enter address"],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("Company", companySchema);
export default Company;
