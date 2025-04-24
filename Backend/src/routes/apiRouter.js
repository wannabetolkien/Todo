import { Router } from "express";
import authRouter from "./auth.router.js";
import todoRouter from "./todo.router.js";



const apiRouter = Router();
apiRouter.use("/auth",authRouter);
apiRouter.use("/todo",todoRouter);

export default apiRouter;