import { BotCommand, MyContext } from '../types';
import { Telegraf } from 'telegraf';
import startCommand from './startCommand';

export const commands: BotCommand[] = [startCommand];

export const registerCommands = (bot: Telegraf<MyContext>) => {
  commands.forEach((cmd) => cmd.register(bot));
};
 