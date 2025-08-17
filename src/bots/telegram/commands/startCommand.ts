import { handleStart } from '../handlers/handleStart';
import { handleSubscribe } from '../handlers/handleSubscribe';
import { handleUnsubscribe } from '../handlers/handleUnSubscribe';
import { BotCommand, MyContext } from '../types';
import { Telegraf, Markup } from 'telegraf';

const startCommand: BotCommand = {
  name: 'start',
  description: 'Start the bot',
  register: (bot: Telegraf<MyContext>) => {

    bot.command('start', handleStart
   
    
    ),
    bot.action("TRIGGER_SUBSCRIBE", handleSubscribe),
    bot.action("TRIGGER_UNSUBSCRIBE", handleUnsubscribe )

  },
};

export default startCommand;
