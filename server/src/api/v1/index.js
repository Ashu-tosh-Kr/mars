import { Router } from "express";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const routes = () => {
  const router = Router();
  router.use("/auth", authRouter);
  router.use("/user", userRouter);

  return router;
};
export default routes;
