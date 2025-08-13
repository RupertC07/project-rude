import { Telegraf } from 'telegraf';

export interface BotCommand {
  name: string;
  description: string;
  register: (bot: Telegraf) => void;
}
