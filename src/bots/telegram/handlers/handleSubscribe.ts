import { Markup } from "telegraf";
import { MyContext } from "../types";
import config from "../../../config";
import { helper as JWT } from "../../../config/jwt";
import * as UserService from "../../../services/userService"


export const handleSubscribe = async (ctx: MyContext) => {

    if (ctx.session.user?.isSubscribedToForecast) {

        if (!ctx.session.user.foreCastSubscription) {
            return await ctx.replyWithMarkdownV2("Please wait for the admin to accept your request\\.")
        }

        return await ctx.replyWithMarkdownV2("You are already subscribed\\.")
    }

    await ctx.replyWithMarkdownV2("Subscribing\\.\\.\\.")

    await UserService.update(ctx.session.user?.id as string, { isSubscribedToForecast: true })

    if (ctx.session.user) {
        ctx.session.user.isSubscribedToForecast = true;
    }   

    if (ctx.session.user?.foreCastSubscription) {
           return await ctx.replyWithMarkdownV2("You are already subscribed again! You can now receive rude forecasts\\!")
    }

    return await ctx.replyWithMarkdownV2("You are already subbscribed\\! Please wait for the admin to accept your request\\.")


}