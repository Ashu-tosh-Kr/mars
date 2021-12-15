import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Please enter title"],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    clientTeam: {
      type: String,
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
clientSchema.post("find", async function (clients) {
  // for (let client of clients) {
  // await client.populate("company");
  // }
});

clientSchema.post("save", async function (client, next) {
  // await client.populate("company");

  next();
});
const Client = mongoose.model("Client", clientSchema);
export default Client;
