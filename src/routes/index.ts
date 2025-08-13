import { Router } from "express";
// import userRouter from "./userRoute";
import { enableCompileCache } from "module";
import authRouter from "./authRoute";

const router = Router()
// router.use("/user", userRouter)
// router.use("/auth", authRouter)


export default router