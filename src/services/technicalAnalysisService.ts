import { listExchange } from "./exchangeService";
import { BinanceService } from "./binanceService";
import { FullKlineOutputType } from "../zod/schemas/klineSchema";
import { TechnicalAnalysisAgent } from "./agent/technicalAnalysisAgent";
import config from "../config";

class TechnicalAnalysisService {
  private binance = new BinanceService();
  private agent = new TechnicalAnalysisAgent();

  generateKlines = async () => {
    const exchangeList = await listExchange();

    if (exchangeList.length === 0) {
      return null;
    }

    const results = await Promise.all(
      exchangeList.map(async (exchange) => {
        const klines = await this.binance.getKlines({
          symbol: exchange.symbol, 
          interval: config.binance.interval as string,
          limit: 24,
        });

        return {
          exchange: exchange.name,
          symbol: exchange.symbol,
          description: exchange.description,
          klines,
        };
      })
    );

    return results;
  };

  generateAnalysis = async(data: FullKlineOutputType) =>{

    const analysis = await this.agent.generate(data)

    return {
        exchange: data.exchange,
        symbol: data.symbol,
        analysis
    }

  }
}

export default TechnicalAnalysisService;
