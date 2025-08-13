import { Telegraf } from 'telegraf';
import { registerCommands } from './commands';
import config from '../../config';
import logger from '../../config/logger';
import { handleFreeText } from './handlers/handleFreeText';

const token = config.telegram.bot_key
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN not provided');
}

export const bot = new Telegraf(token);

const commands = [
  { command: 'start', description: 'Start interacting with the bot' },
]
bot.telegram.setMyCommands(commands);




bot.on('message', async (ctx, next) => {

  if (config.app.env == "development"){
    logger.info('Received message:', ctx.message)
    logger.info('details', ctx)
  }

  const isCommand = await handleFreeText(ctx)
  
  if (!isCommand) {
    return
  }

  await next();
});

registerCommands(bot)

