import { Router } from "express";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import gigRouter from "./routes/gigRoutes.js";
import costRouter from "./routes/costRoutes.js";

const routes = () => {
  const router = Router();
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/company", companyRouter);
  router.use("/client", clientRouter);
  router.use("/gig", gigRouter);
  router.use("/cost", costRouter);

  return router;
};
export default routes;
