import axios from "axios";
import {KlineOutputSchema, binanceKlineOutputSchema} from "../zod/schemas/klineSchema";
import config from "../config";

export class BinanceService {
  private baseUrl = config.binance.api as string;

  
  async getKlines(params: {
    symbol: string;
    interval: string;
    startTime?: number;
    endTime?: number;
    timeZone?: string;
    limit?: number;
  }): Promise<KlineOutputSchema[]> {
    const { symbol, interval, startTime, endTime, timeZone, limit } = params;

    console.log(this.baseUrl)
    
    const response = await axios.get(`${this.baseUrl}/klines`, {
      params: {
        symbol,
        interval,
        startTime,
        endTime,
        timeZone,
        limit
      }
    });

    

    const klines = response.data.map((k: any[]) => ({
      open_time: k[0],
      open_price: k[1],
      high_price: k[2],
      low_price: k[3],
      close_price: k[4],
      volume: k[5],
      close_time: k[6],
      quote_asset_volume: k[7],
      trades: k[8],
      taker_buy_base_volume: k[9],
      taker_buy_quote_volume: k[10]
    }));

    return klines
  }
}
