import { MyContext } from "../types";
import * as UserService from "../../../services/userService"


export const handleUnsubscribe = async(ctx:MyContext) =>{

    console.log("check")

    if (!ctx.session.user?.isSubscribedToForecast) 
    {
        return await ctx.replyWithMarkdownV2("Inavild action\\. You are not a subscriber\\.")
    }

    await ctx.replyWithMarkdownV2("Unsubscribing\\.\\.\\.\\.")

    await UserService.update(ctx.session.user.id, {isSubscribedToForecast:false})
    ctx.session.user.isSubscribedToForecast = false

    await ctx.replyWithMarkdownV2("You are now not part of the forecast\\. 😞")

    return
}