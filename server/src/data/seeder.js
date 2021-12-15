import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import dbConfig from "../config/dbConfig.js";
import User from "../api/v1/models/userModel.js";
import Company from "../api/v1/models/companyModel.js";
import Client from "../api/v1/models/clientModel.js";
import users from "./users.js";
import companies from "./companies.js";
import clients from "./clients.js";
import gigStatuses from "./gigStatuses.js";
import GigStatus from "../api/v1/models/gigStatusModel.js";

dotenv.config();

dbConfig();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    await Company.deleteMany();
    const sampleCompanies = await Company.insertMany(companies);
    const comp = sampleCompanies[0]._id;

    await GigStatus.deleteMany();
    await GigStatus.insertMany(gigStatuses);

    await Client.deleteMany();
    const sampleClients = clients.map((client) => {
      return {
        ...client,
        company: comp,
      };
    });
    await Client.insertMany(sampleClients);

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
