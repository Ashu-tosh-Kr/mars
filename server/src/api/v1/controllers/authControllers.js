import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import vars from "../../../config/vars.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

import {
  createAccessToken,
  createRefreshToken,
} from "../helpers/createTokens.js";
import { sendMail } from "../helpers/sendMail.js";

/**
 * @desc register
 * @route api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  const { email, employeeId, username, phone, role } = req.body;

  //validation
  const validation = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(8).alphanum().required(),
  }).validate(req.body, { abortEarly: false, allowUnknown: true });
  if (validation.error) {
    res.status(400);
    throw new Error(validation.error);
  }

  const user = await User.findOne({ email: email });
  if (user) {
    res.status(409);
    throw new Error("Account with this email already exists");
  }

  const hashedpwd = await bcrypt.hash("123456", 10);

  //without verifying email
  const newuser = await User.create({
    username,
    employeeId,
    email,
    password: hashedpwd,
    avatar: `https://ui-avatars.com/api/?name=${username}`,
    phone,
    role,
    isActive: true,
  });
  res.status(200).json({ message: "User Created", data: newuser });
};

/**
 * @desc login
 * @route api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
    throw new Error("Wrong Email");
  }

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    res.status(401);
    throw new Error("Wrong Password");
  }
  if (!user.isActive) {
    res.status(401);
    throw new Error("Access revoked, contact admin.");
  }
  const token = createAccessToken({
    userId: String(user._id),
    iat: new Date().getTime(),
    exp: new Date().getTime() + 15 * 60 * 1000, //15min
  });

  const refresh_token = createRefreshToken({
    id: user._id,
    exp: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  });

  const trimmedUser = {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
  res.status(200).json({
    message: "Success",
    data: { access_token: token, refresh_token, user: trimmedUser },
  });
};

/**
 * @desc get access token
 * @route api/auth/refresh_token/
 * @access Public
 */
export const getAccessToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    res.status(401);
    throw new Error("Please Login!");
  }
  jwt.verify(refresh_token, vars.refreshToken, async (err, decodedToken) => {
    try {
      if (err) {
        res.status(401).json({ message: "Please Login" });
        return;
      } else if (decodedToken.exp < new Date().getTime()) {
        res.status(401).json({ message: "Token Expired" });
        return;
      } else {
        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
          res.status(401).json({
            message: "Please Re-Login",
          });
          return;
        }
        const token = createAccessToken({
          userId: String(user._id),
          iat: new Date().getTime(),
          exp: new Date().getTime() + 15 * 60 * 1000, //15min
        });
        res.status(200).json({
          message: "Success",
          data: { access_token: token, refresh_token, user: user },
        });
      }
    } catch (e) {
      res.status(401).json({
        message: "Please Re-Login",
      });
    }
  });
};

/**
 * @desc change password
 * @route api/auth/change_pass
 * @access Private
 */
export const changePass = async (req, res) => {
  const { oldPass, newPass } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User doesn't exist");
  }
  const isPassValid = await bcrypt.compare(oldPass, user.password);
  if (!isPassValid) {
    res.status(401);
    throw new Error("Wrong Password");
  }

  const hashedpwd = await bcrypt.hash(newPass, 10);
  user.password = hashedpwd;
  await user.save();

  res.status(200).json({
    message: "Password changed successfully",
  });
};

/**
 * @desc forgot password
 * @router api/auth/forgot
 * @access Public
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error("Account with this email doesn't exists");
  }
  const access_token = createAccessToken({ id: user._id });
  const url = `${vars.clientUrl}/user/reset/${access_token}`;

  sendMail(email, url, "Reset your password");
  res.json({ message: "Password reset link send, please check your email." });
};

/**
 * @desc reset password
 * @router api/auth/reset
 * @access Public
 */
export const resetPassword = async (req, res) => {
  const { password, access_token } = req.body;

  const passwordHash = await bcrypt.hash(password, 12);
  jwt.verify(access_token, vars.accessToken, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Wrong access token" });
    }
    await User.findOneAndUpdate(
      { _id: decodedToken.id },
      {
        password: passwordHash,
      }
    );
    res.json({ message: "Password successfully changed!" });
  });
};
