import { Request, Response } from "express";
import crypto from "crypto"

import * as DiscordAuth from "../config/discordOauth"
import axios from "axios";
import { helper } from "../config/jwt";
import * as UserService from "../services/userService"
import * as DiscordService from "../services/discordAccountService"
// import { helper } from "../config/jwt";
import { bot as telegramBot } from "../bots/telegram/index"
import { DiscordAccount } from "../../generated/prisma";
import prisma from "../config/prisma";


export const discordAuth = async (req: Request, res: Response) => {

    const { state, platform } = req.query


    if (!state && platform == "telegram") {
        res.redirect("https://t.me/ruuude_bot")
    }

    const payload = helper.verify(state as string) as { telegramId?: string, platform?: string };

    console.log(payload)
    if (payload.telegramId && payload.platform == "telegram") {

        const user = await UserService.getByTgId(payload.telegramId as string)

        if (!user) {
            return res.redirect("https://t.me/ruuude_bot")
        }
        else {

            if (user.isSubscribedToForecast) {

                if (user.foreCastSubscription == false) {
                    await telegramBot.telegram.sendMessage(payload.telegramId,
                        "You already sent a request. Please wait for the admin to accept your subscription")

                    return res.redirect("https://t.me/ruuude_bot")
                }

                await telegramBot.telegram.sendMessage(payload.telegramId,
                    "You are already a subscriber! No need to subscribe again")

                return res.redirect("https://t.me/ruuude_bot")

            }

        }



    }


    const url = DiscordAuth.oauth.generateAuthUrl({
        scope: ["identify", "guilds"],
        state: state as string || crypto.randomBytes(16).toString("hex")
    })

    res.redirect(url)
}

export const discordAuthCallback = async (req: Request, res: Response) => {

    try {

        const code = req.query.code as string;
        const state = req.query.state as string;

        if (!code) {
            res.redirect("https://t.me/ruuude_bot")
        }

        const payload = helper.verify(state as string) as { telegramId?: string, platform?: string };


        const token = await DiscordAuth.oauth.tokenRequest({
            code: code,
            scope: "identify email",
            grantType: "authorization_code"
        })

        const user = await DiscordAuth.oauth.getUser(token.access_token)
        console.log("User:", user)
        console.log(token)

        const rude_user = await UserService.getByTgId(payload.telegramId as string)

        if (rude_user?.discordAccount) {
            const update_user = await UserService.update(rude_user?.id as string, { isSubscribedToForecast: true })
            await telegramBot.telegram.sendMessage(payload.telegramId as string, "You are now registered to our forecast! 🚀")
            return res.redirect("https://t.me/ruuude_bot")
        }

        const discordData: Omit<DiscordAccount, "id"> = {
            accessToken: null,
            refreshToken: null,
            tokenExpiration: null,
            userName: user.username,
            userId: rude_user?.id as string,
            avatar: user.avatar ?? null,
            discordId: user.id,
            globalName: user.global_name ?? '',
        }

        const new_discord = await DiscordService.create(discordData)

        const update_user = await UserService.update(rude_user?.id as string, { isSubscribedToForecast: true })

        // const tgSession = await prisma.tgSession.findFirst({
        //     where: {
        //         session: {
        //             path: ["user", "id"],
        //             equals: rude_user?.id
        //         }
        //     }
        // });

        const tgSession = await prisma.tgSession.findFirst({
            where:{
                key: `${payload.telegramId}:${payload.telegramId}`
            }
        })

        if (tgSession) {

            console.log(tgSession)
            const currentSession = tgSession.session as any;

            const updatedSession = {
                ...currentSession,
                user: {
                    ...currentSession.user,
                    ...update_user
                }
            };

            await prisma.tgSession.update({
                where: {
                    id: tgSession.id
                },
                data: {
                    session: updatedSession
                }
            });
        }
        else{
            console.log("no session found")
        }





        const bot = await telegramBot.telegram.sendMessage(payload.telegramId as string, "You are now registered to our forecast! 🚀")
        // res.json({
        //     user, token
        // })

        // if (telegramPayload?.chat_id) {

        //   const bot =  await telegramBot.telegram.sendMessage(telegramPayload.chat_id, "You are now registered! You can now subscribe to our forecast! 🚀")
        //   console.log(bot)
        // }
        return res.redirect("https://t.me/ruuude_bot")

    } catch (error) {
        console.log(error)
        return res.redirect("https://t.me/ruuude_bot")
    }
}


