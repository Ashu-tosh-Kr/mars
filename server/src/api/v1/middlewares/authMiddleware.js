import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import vars from "../../../config/vars.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, vars.accessToken, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        const user = await User.findById(decodedToken.userId);
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Access Denied");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 4) {
    res.status(401);
    throw new Error("Admin resources, Access Denied");
  }
  next();
};

export const isCeo = (req, res, next) => {
  if (req.user.role !== 3) {
    res.status(401);
    throw new Error("CEO resources, Access Denied");
  }
  next();
};

export const isSuperviser = (req, res, next) => {
  if (req.user.role !== 2) {
    res.status(401);
    throw new Error("Superviser resources, Access Denied");
  }
  next();
};

export const isAssistant = (req, res, next) => {
  if (req.user.role !== 1) {
    res.status(401);
    throw new Error("Assistant resources, Access Denied");
  }
  next();
};
