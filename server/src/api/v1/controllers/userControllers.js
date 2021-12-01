import User from "../models/userModel.js";

/**
 * @desc get user information
 * @router api/user/info
 * @access Private
 */
export const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({ message: "Successful", data: user });
};
