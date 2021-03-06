import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=John+Doe",
    },
    employeeId: {
      type: String,
      required: [true, "Please enter Employee ID"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    phone: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
