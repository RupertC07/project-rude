import type { TelegramAccount } from "../../generated/prisma";
import prisma from "../config/prisma";

export const create = async (account: Omit<TelegramAccount, "id">) => {
  return prisma.telegramAccount.create({
    data: account,
  });
};

export const getById = async (id: string) => {
  return prisma.telegramAccount.findUnique({
    where: { id },
  });
};

export const update = async (id: string, data: Partial<TelegramAccount>) => {
  return prisma.telegramAccount.update({
    where: { id },
    data,
  });
};

export const getByTelegramId = async (telegramId: string) => {
  return prisma.telegramAccount.findFirst({
    where: { 
        telegramId:telegramId
     },
  });
};

export const getByUserId = async (userId: string) => {
  return prisma.telegramAccount.findFirst({
  where: {
    user: {
      id: userId
    }
  }
});
};
