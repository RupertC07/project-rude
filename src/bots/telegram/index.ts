import { session, Telegraf, Context } from 'telegraf';
import { Mongo } from '@telegraf/session/mongodb';
import { registerCommands } from './commands';
import config from '../../config';
import logger from '../../config/logger';
import { handleFreeText } from './handlers/handleFreeText';
import { MyContext, SessionData } from './types';
import { info } from 'console';
import * as UserService from '../../services/userService';
import { handleSession } from './handlers/handleSession';

const token = config.telegram.bot_key;
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN not provided');
}

export const bot = new Telegraf<MyContext>(token);

const store = Mongo<SessionData>({
  url: config.db.url as string,
  collection: 'tgsession',
});

bot.use(session({
  store,
  defaultSession: (): SessionData => ({
    lastActivity: new Date(),
    user: null
  })
}));

const commands = [
  { command: 'start', description: 'Start interacting with the bot' },
];

bot.telegram.setMyCommands(commands);

bot.use(handleSession)

bot.on('message', async (ctx, next) => {
  if (ctx.session === undefined) {
    return;
  }

  console.log(ctx.session.user)



  if (config.app.env === "development") {
    logger.info('Received message:', ctx.message);
    logger.info('Session data:', ctx.session);
  }

  const isCommand = await handleFreeText(ctx);
  if (!isCommand) {
    return;
  }

  await next();
});

registerCommands(bot);