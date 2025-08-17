import { FullTechnicalAnalysisResult } from "../../../zod/schemas/technicalAnalysisSchema";
import { bot } from "../index";
import { escapeMarkdown } from "../../../utils/escapeMarkdown";

export const broadcastTechnicalAnalysis = async (
  analysis: FullTechnicalAnalysisResult[],
  chatId: string
) => {
  const analysisMarkdown = analysis
    .map(
      (a) => `


*Exchange*: ${a.exchange}
*Symbol*: ${a.symbol}
*Prediction Basis*: ${a.analysis.short_explanation}
*Futures*: ${a.analysis.future_type}
*Entry Point*: ${a.analysis.entry_point}
*Take Profit*: ${a.analysis.take_profit}
*Stop Loss*: ${a.analysis.stop_loss}

`
    )
    .join("\n");


    

    const message = `📢 *WOOT WOOT WOOT! Here comes another signal!*\n${analysisMarkdown}\n⚠️ Always remember, don't be greedy! When happy, TP!`

  return await bot.telegram.sendMessage(chatId, escapeMarkdown(message), {
    parse_mode: "MarkdownV2",
  });
};
