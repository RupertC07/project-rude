import type { User } from "../../generated/prisma";
import prisma from "../config/prisma";

export const create = async (user: Omit<User, "id">) => {
  return prisma.user.create({
    data: user,
    include:{
        discordAccount:true,
        telegramAccount:true
    }
  });
};

export const getById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      telegramAccount: true,
      discordAccount: true,
    },
  });
};

export const update = async (id: string, data: Partial<User>) => {
  return prisma.user.update({
    where: { id },
    data,
    include:{
        discordAccount:true,
        telegramAccount:true
    }
  });
};

export const getByTgId = async (telegramId: string) => {
  return prisma.user.findFirst({
    where: {
      telegramAccount: {
        is: {
          telegramId,
        },
      },
    },
    include: {
      telegramAccount: true,
      discordAccount: true,
    },
  });
};

export const getByDiscordId = async (discordId: string) => {
  return prisma.user.findFirst({
    where: {
      discordAccount: {
        is: {
          discordId,
        },
      },
    },
    include: {
      discordAccount: true,
      telegramAccount: true,
    },
  });
};
