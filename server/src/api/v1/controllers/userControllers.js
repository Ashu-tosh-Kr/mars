import User from "../models/userModel.js";
import Joi from "joi";

/**
 * @desc get all users
 * @router api/user/
 * @access Private
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({ message: "Successful", data: users });
};

/**
 * @desc get user information
 * @router api/user/info
 * @access Private
 */
export const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate({
      path: "todos",
      populate: {
        path: "client",
      },
    })
    .populate({
      path: "todos",
      populate: {
        path: "talent",
      },
    })
    .populate({
      path: "todos",
      populate: {
        path: "currentStatus",
      },
    });

  res.json({ message: "Successful", data: user });
};

/**
 * @desc edit one user
 * @route api/user/
 * @access Private
 */
export const editUser = async (req, res) => {
  const { email, employeeId, username, phone, role, isActive } = req.body;

  //validation
  const validation = Joi.object({
    email: Joi.string().email().required(),
  }).validate(req.body, { abortEarly: false, allowUnknown: true });
  if (validation.error) {
    res.status(400);
    throw new Error(validation.error);
  }

  const user = await User.findOne({ employeeId: employeeId });
  if (!user) {
    res.status(404);
    throw new Error("Account with this email doesn't exist");
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      employeeId: employeeId,
    },
    {
      username,
      email,
      phone,
      role,
      isActive,
    }
  ).select("-password");
  res.status(200).json({ message: "User Updated", data: updatedUser });
};
