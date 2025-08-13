import { handleStart } from '../handlers/handleStart';
import { BotCommand } from './types';
import { Telegraf, Markup } from 'telegraf';

const startCommand: BotCommand = {
  name: 'start',
  description: 'Start the bot',
  register: (bot: Telegraf) => {

    bot.command('start', handleStart
    // bot.command('start', async (ctx) => {
    //   await ctx.reply(
    //     '👋 Welcome to ProjectNex!\nPress the button below to get started.',
    //     Markup.inlineKeyboard([
    //       Markup.button.url('🚀 Get Started', 'https://your-app.com/onboarding')
    //     ])
    //   );
    // });

    
    )
    // bot.action("TRIGGER_SUBSCRIBE", async (ctx) =>{
    //   ctx.sendMessage("You are now subscribed! 💯")
    //   ctx.sendAnimation("https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif");
      
    // })

  },
};

export default startCommand;
