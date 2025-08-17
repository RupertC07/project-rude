// import z from "zod";

// export const technicalAnalysisSchema = z.object({
//   short_explanation: z.string().min(1, "Short explanation cannot be empty"),
//   future_type: z.enum(["long", "short"], {
//     errorMap: () => ({ message: "Future type must be either 'long' or 'short'" })
//   }),
//   entry_point: z.number().min(0, "Entry point must be a positive decimal"),
//   take_profit: z.number().min(0, "Take profit must be a positive decimal"),
//   stop_loss: z.number().min(0, "Stop loss must be a positive decimal"),
// });

// export type TechnicalAnalysisSchemaType = z.infer<typeof technicalAnalysisSchema>

import z from "zod";

export const technicalAnalysisSchema = z.object({
  short_explanation: z.string().min(1, "Short explanation cannot be empty"),
  future_type: z.enum(["long", "short"], {
    errorMap: () => ({ message: "Future type must be either 'long' or 'short'" })
  }),
  entry_point: z.string().regex(/^\d+\.\d+$/, "Entry point must be a decimal number with a '.'"),
  take_profit: z.string().regex(/^\d+\.\d+$/, "Take profit must be a decimal number with a '.'"),
  stop_loss: z.string().regex(/^\d+\.\d+$/, "Stop loss must be a decimal number with a '.'"),
});

export type TechnicalAnalysisSchemaType = z.infer<typeof technicalAnalysisSchema>;


export const fullTechnicalAnalysis = z.object({
  exchange: z.string().min(1),
  symbol: z.string().min(1),
  analysis: technicalAnalysisSchema
})

export type FullTechnicalAnalysisResult = z.infer<typeof fullTechnicalAnalysis>;