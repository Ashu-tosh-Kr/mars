import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import vars from "../../../config/vars.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

import {
  createAccessToken,
  createRefreshToken,
} from "../helpers/createTokens.js";
import { sendEmail } from "../helpers/sendMail.js";

/**
 * @desc register
 * @route api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  //validation
  const validation = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
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

  const hashedpwd = await bcrypt.hash(password, 10);

  //without verifying email
  const newuser = await User.create({
    username,
    email,
    password: hashedpwd,
    avatar: `https://ui-avatars.com/api/?name=${username}`,
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
  const token = createAccessToken({
    userId: String(user._id),
    iat: new Date().getTime(),
  });

  const refresh_token = createRefreshToken({ id: user._id });
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/auth/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const trimmedUser = {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
  res
    .status(200)
    .json({
      message: "Success",
      data: { access_token: token, user: trimmedUser },
    });
};

/**
 * @desc get access token
 * @route api/auth/refresh_token/
 * @access Public
 */
export const getAccessToken = async (req, res) => {
  const { refreshtoken } = req.cookies;
  if (!refreshtoken) {
    res.status(401);
    throw new Error("Please Login!");
  }
  jwt.verify(refreshtoken, vars.refreshToken, async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "please Login" });
    }
    const user = await User.findById(decodedToken.id);
    const token = createAccessToken({
      userId: String(user._id),
      iat: new Date().getTime(),
    });
    res
      .status(200)
      .json({ message: "Success", data: { access_token: token, user: user } });
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

  sendEmail(email, url, "Reset your password");
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
