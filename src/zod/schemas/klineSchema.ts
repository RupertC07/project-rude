import z, { symbol } from "zod";

export const klineObjectSchema = z.object({
  open_time: z.number(),
  open_price: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  high_price: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  low_price: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  close_price: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  volume: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  close_time: z.number(),
  quote_asset_volume: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  trades: z.number(),
  taker_buy_base_volume: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
  taker_buy_quote_volume: z.string().regex(/^\d+\.\d+$/, "Must be a decimal number"),
});

export type KlineOutputSchema = z.infer<typeof klineObjectSchema>;

export const binanceKlineOutputSchema = z.object({
  exchange: z.string().min(1, "exchange cannot be empty"),
  symbol: z.string().min(1, "exchange symbol cannot be empty"),
  description: z.string().min(1, "description cannot be empty"),
  klines: z.array(klineObjectSchema)
});

export type FullKlineOutputType = z.infer<typeof binanceKlineOutputSchema>;
