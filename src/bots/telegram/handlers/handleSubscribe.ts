import { Markup } from "telegraf";
import { MyContext } from "../types";
import config from "../../../config";
import { helper as JWT } from "../../../config/jwt";


export const handleSubscribe = async (ctx: MyContext) =>{

    const appUrl = config.app.url
    const jwt = JWT.sign({telegramId: ctx.session.user?.telegramAccount?.telegramId, platform:"telegram", userId: ctx.session.user?.id})

    if (ctx.session.user?.isSubscribedToForecast==true) {

        if (ctx.session.user.foreCastSubscription == false)
        {
            await ctx.replyWithMarkdownV2("Your request is already submitted please wait for the admin to accept it\\.")
            return
        }

        await ctx.replyWithMarkdownV2("You are already subscribed to the forecast please wait on my signals\\.")
            return
        
    }

    await ctx.replyWithMarkdownV2("To subscribe you need to login via discord", 
        Markup.inlineKeyboard([
            [Markup.button.url("🤖 Login to discord", "discord.com")]
        ])
    )

}