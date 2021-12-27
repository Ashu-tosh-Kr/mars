import vars from "../../../config/vars.js";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, vars.accessToken);
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, vars.refreshToken);
};
