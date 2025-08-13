import { handleStart } from '../handlers/handleStart';
import { handleSubscribe } from '../handlers/handleSubscribe';
import { BotCommand, MyContext } from '../types';
import { Telegraf, Markup } from 'telegraf';

const startCommand: BotCommand = {
  name: 'start',
  description: 'Start the bot',
  register: (bot: Telegraf<MyContext>) => {

    bot.command('start', handleStart
   
    
    ),
    bot.action("TRIGGER_SUBSCRIBE", handleSubscribe)

  },
};

export default startCommand;
