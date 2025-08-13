import { Context } from "telegraf";

import { Telegraf } from 'telegraf';
import { DiscordAccount, TelegramAccount, User } from "../../../generated/prisma";

interface UserWithAccounts extends User {
    telegramAccount?: TelegramAccount | null;
    discordAccount?: DiscordAccount|null;
}


export interface SessionData {
  messageCount?: number;
  user?: UserWithAccounts | null;
  lastActivity?: Date
}

export interface MyContext extends Context {
  session: SessionData;
}




export interface BotCommand {
  name: string;
  description: string;
  register: (bot: Telegraf<MyContext>) => void;
}
