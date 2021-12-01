import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./users.js";
import dbConfig from "../config/dbConfig.js";
import User from "../api/v1/models/userModel.js";

dotenv.config();

dbConfig();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroytData = async () => {
  try {
    await User.deleteMany();

    console.log(`Data Destroyed`.green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroytData();
} else {
  importData();
}
