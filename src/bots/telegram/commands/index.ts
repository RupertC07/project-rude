import { BotCommand } from './types';
import { Telegraf } from 'telegraf';
import startCommand from './startCommand';

export const commands: BotCommand[] = [startCommand];

export const registerCommands = (bot: Telegraf) => {
  commands.forEach((cmd) => cmd.register(bot));
};
