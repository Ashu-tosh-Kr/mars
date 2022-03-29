import express from "express";
import routes from "./api/v1/index.js";
import config from "./config/index.js";
import { errorHandler, notFound } from "./config/customErrorHandler.js";
import vars from "./config/vars.js";

const startServer = async () => {
  const app = express();
  await config(app);
  app.use(vars.api.prefix, routes());

  //Custom error handler
  app.use(notFound);
  app.use(errorHandler);

  //default api route
  app.get("/", (req, res) => res.status(200).send("Hello World"));

  //start server
  app.listen(vars.port, () =>
    console.log(`Listening on port ${vars.port}`.yellow.bold)
  );
};
startServer();
