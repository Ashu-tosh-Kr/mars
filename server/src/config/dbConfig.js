import mongoose from "mongoose";
import vars from "./vars.js";
const { connect } = mongoose;

const dbConfig = async () => {
  try {
    await connect(vars.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    });
    console.log(`Connected to DB`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default dbConfig;
