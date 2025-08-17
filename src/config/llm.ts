import { ChatOpenAI } from "@langchain/openai";
import config from ".";

const llm = new ChatOpenAI({
 model: "sonar",
 apiKey: config.perplexity.api_key,
 configuration: {
   baseURL: "https://api.perplexity.ai"
 }
});

export default llm;