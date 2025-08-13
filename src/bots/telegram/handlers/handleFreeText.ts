import { Context, Markup } from "telegraf";
import { commands } from "../commands";

export const handleFreeText = async (ctx: Context) => {
    
  const text = typeof ctx.message === 'object' && 'text' in ctx.message && typeof ctx.message.text === 'string'
    ? ctx.message.text
    : '';
  const isCommand = text.startsWith('/');
    if (!isCommand) {
          await ctx.replyWithMarkdownV2(`👋 Yo\\! That doesn't look like a supported command or free text I can understand yet\\.\n\n` +
      `Please use the commands panel or type /start to interact with me\\!\n\n` +
      `I'm here to help you with crypto forecasts 😎`);

    }

    return isCommand

};