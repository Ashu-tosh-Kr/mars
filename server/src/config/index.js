import express from "express";
import { config as dotEnvConfig } from "dotenv";
import dbConfig from "./dbConfig.js";
import middlewareConfig from "./middlewareConfig.js";
import colors from "colors";

const config = async (app) => {
  dotEnvConfig();
  middlewareConfig(app);
  await dbConfig();
};
export default config;
