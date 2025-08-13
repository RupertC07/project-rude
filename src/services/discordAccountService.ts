import type { DiscordAccount } from "../../generated/prisma";
import prisma from "../config/prisma";

export const create = async (account: Omit<DiscordAccount, "id">) => {
  return prisma.discordAccount.create({
    data: account,
  });
};

export const getById = async (id: string) => {
  return prisma.discordAccount.findUnique({
    where: { id },
  });
};

export const update = async (id: string, data: Partial<DiscordAccount>) => {
  return prisma.discordAccount.update({
    where: { id },
    data,
  });
};

export const getByDiscordId = async (discordId: string) => {
  return prisma.discordAccount.findFirst({
    where: { discordId },
  });
};

export const getByUserId = async (userId: string) => {
  
  return prisma.discordAccount.findFirst({
  where: {
    user: {
      id: userId
    }
  }
});

};
