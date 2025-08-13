import { Router } from "express";
import * as authController from "../controllers/authController"

const authRouter = Router();


authRouter.get("/discord", authController.discordAuth)
authRouter.get("/discord/callback", authController.discordAuthCallback)

export default authRouter;
