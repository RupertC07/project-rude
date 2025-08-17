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
import llm from "./src/config/llm";
import { BinanceService } from "./src/services/binanceService";
import TechnicalAnalysisService from "./src/services/technicalAnalysisService";
import { broadcastTechnicalAnalysis } from "./src/bots/telegram/broadcast/technicalAnalysis";


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

app.post("/llm", async (req, res)=>{
  
  const {query} = req.body

  const response = await llm.invoke(query)

  return ApiResponse.success({
    res, 
    data: response,
    code:200,
    message: "ok"
  })
})

app.get('/binance/klines', async(req, res, next) =>{
  try {

    const {symbol, interval, limit} = req.query
    const binance = new BinanceService()
    
    if (symbol&&interval&&limit) {
      const params = {
        symbol: symbol as string,
        interval: interval as string,
        limit: parseInt(limit as string)
      }
      const klines = await binance.getKlines(params)

      return ApiResponse.success({
        res,
        data:klines,
        code:200,
        message:"ok"
      })
    
    }

    return ApiResponse.success({
      res,
      data:null,
      message:"ok",
      code:200
    })
    
  } catch (error) {
    next(error)
  }
})

app.get("/analysis", async(req, res,next)=>{
  try {

    const techAnalysis = new TechnicalAnalysisService()

    const data = await techAnalysis.generateKlines()

    if (!data) {
    console.log("No exchanges found");
    return;
  }

    const analysis = await Promise.all(
      data.map(async (exchangeKlines) => {
        return await techAnalysis.generateAnalysis(exchangeKlines);
      })
    );

    await broadcastTechnicalAnalysis(analysis, "5591292386")

    return ApiResponse.success({
      res,
      data: analysis,
      code:200,
      message:"ok"
    })
    
  } catch (error) {
    next(error)
  }
})



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
