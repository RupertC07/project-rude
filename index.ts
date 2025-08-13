import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morganMiddleware from "./src/config/morgan";
import logger from "./src/config/logger";
import config from "./src/config";
import ApiResponse from "./src/utils/ApiResponse";
import router from "./src/routes";
// import { AppDataSource } from "./src/config/dataSource";
import { errorHandler } from "./src/middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger";
import swagger from "./src/config/swagger";
import authRouter from "./src/routes/authRoute";
import { setTelegramWebhook } from "./src/config/telegramWebhookRegistry";
import {bot as TelegramBot} from"./src/bots/telegram"


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

if (config.app.env === "development") {
  app.use(morganMiddleware);
}

swagger(app)
app.use("/auth", authRouter)
app.use("/api/v1", router);



app.get("/", (req, res) => {
  return res.redirect('/docs')
});
app.use(errorHandler)
const port = config.app.port;


app.use(TelegramBot.webhookCallback('/telegram/webhook'))

app.listen(port, async () => {
      logger.info(`🚀 App is listening @ port ${port}`, { port });
      await setTelegramWebhook()
    });
// AppDataSource.initialize()
//   .then(() => {
//     logger.info("📦 Database connected");

    
//   })
//   .catch((err:any) => {
//     logger.error("❌ Failed to initialize database", err);
//     process.exit(1);
//   });
