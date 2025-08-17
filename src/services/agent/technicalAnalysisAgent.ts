import llm from "../../config/llm";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { TechnicalAnalysisSchemaType, technicalAnalysisSchema } from "../../zod/schemas/technicalAnalysisSchema";
import { FullKlineOutputType } from "../../zod/schemas/klineSchema";
import config from "../../config";
export class TechnicalAnalysisAgent {
    private llmProvider = llm;
    private formSchema = technicalAnalysisSchema;

    private getParser = () => {
        const parser = StructuredOutputParser.fromZodSchema(this.formSchema as any);
        const instruction = parser.getFormatInstructions();
        return { instruction, parser };
    };

//     private getPrompt = async (query: FullKlineOutputType) => {
//         const klinesText = query.klines.map(k =>
//             `Time: ${new Date(k.open_time).toISOString()}, Open: ${k.open_price}, High: ${k.high_price}, Low: ${k.low_price}, Close: ${k.close_price}, Volume: ${k.volume}`
//         ).join("\n");

//         const userInput = `
//             Exchange: ${query.exchange}
//             Symbol: ${query.symbol}
//             Description: ${query.description}
//             Interval: 1h

//             Recent klines (last ${query.klines.length}): 
//             ${klinesText}
//             `;

//         const prompt = new PromptTemplate({
//     template: `
// You are "Rude", a direct, no-nonsense crypto technical analysis agent.

// Your job:
// - Perform a technical analysis of the crypto market data provided.
// - Decide if the futures position bias is "long" or "short" ONLY.
// - Provide a short, direct explanation for your decision (max 40 words).
// - Suggest exact price levels for entry, take profit, and stop loss.
// - **IMPORTANT:** 
//   - All prices MUST be returned as strings, must include a decimal point, and must have at least one digit before and after the decimal (e.g., "3000.0", "0.0000090554").
//   - Adjust the risk/reward sizing appropriately for the timeframe interval provided (e.g., 1h vs 1d).
//   - Avoid overly greedy targets — focus on realistic, safer profit zones with conservative risk management.

// User input (crypto market data):
// {user_input}

// Format the output as valid JSON:
// {format_instruction}
//     `,
//     inputVariables: ["user_input"],
//     partialVariables: {
//         format_instruction: this.getParser().instruction
//     }
// });


//         return await prompt.format({ user_input: userInput });
//     };

private getPrompt = async (query: FullKlineOutputType) => {
    const klinesText = query.klines.map(k =>
        `Time: ${new Date(k.open_time).toISOString()}, 
        Open: ${k.open_price}, 
        High: ${k.high_price}, 
        Low: ${k.low_price}, 
        Close: ${k.close_price}, 
        Volume: ${k.volume}, 
        Close Time: ${new Date(k.close_time).toISOString()}, 
        Quote Asset Volume: ${k.quote_asset_volume}, 
        Trades: ${k.trades}, 
        Taker Buy Base Volume: ${k.taker_buy_base_volume}, 
        Taker Buy Quote Volume: ${k.taker_buy_quote_volume}`
    ).join("\n");

    const userInput = `
        Exchange: ${query.exchange}
        Symbol: ${query.symbol}
        Description: ${query.description}
        Interval: ${config}

        Recent klines (last ${query.klines.length}): 
        ${klinesText}
    `;

    const prompt = new PromptTemplate({
        template: `
You are "Rude", a direct, no-nonsense crypto technical analysis agent.

Your job:
- Perform a technical analysis of the crypto market data provided.
- Decide if the futures position bias is "long" or "short" ONLY.
- Provide a short, direct explanation for your decision (max 40 words).
- Suggest exact price levels for entry, take profit, and stop loss.
- **IMPORTANT:** 
  - All prices MUST be returned as strings, must include a decimal point, and must have at least one digit before and after the decimal (e.g., "3000.0", "0.0000090554").
  - Adjust the risk/reward sizing appropriately for the timeframe interval provided (e.g., 1h vs 1d).
  - Avoid overly greedy targets — focus on realistic, safer profit zones with conservative risk management.

User input (crypto market data):
{user_input}

Format the output as valid JSON:
{format_instruction}
        `,
        inputVariables: ["user_input"],
        partialVariables: {
            format_instruction: this.getParser().instruction
        }
    });

    return await prompt.format({ user_input: userInput });
};



    private generateAnalysis = async (query: FullKlineOutputType): Promise<TechnicalAnalysisSchemaType> => {
        const prompt = await this.getPrompt(query);
        const { parser } = this.getParser();
        const response = await this.llmProvider.invoke([
            {
                role: "user",
                content: prompt
            }
        ]);

        const responseText =
            typeof response === "string"
                ? response
                : typeof response.content === "string"
                    ? response.content
                    : JSON.stringify(response.content);

        return await parser.parse(responseText) as TechnicalAnalysisSchemaType;
    };

    generate = async (query: FullKlineOutputType) => {
        const analysisJson = await this.generateAnalysis(query);
        return analysisJson;
    };
}
