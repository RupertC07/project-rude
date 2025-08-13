import { MyContext } from "../types";
import logger from "../../../config/logger";
import * as UserService from "../../../services/userService"
import { TelegramAccount, User } from "../../../../generated/prisma";
import * as TelegramAccountService from "../../../services/telegramAccountService"

export const handleSession = async (ctx: MyContext, next: () => Promise<void>) =>{


    logger.info("SESSION:", ctx.session)

     const sessionId = (ctx.session as any).__id || (ctx.session as any)._id;
    console.log("MongoDB Session ID:", sessionId);

  if (ctx.session.lastActivity) {
    const lastActivity = new Date(ctx.session.lastActivity);
    const now = new Date();
    const diffMs = now.getTime() - lastActivity.getTime();
    const diffMinutes = diffMs / 1000 / 60;

    if (diffMinutes > 3) {
      console.log('More than 3 minutes have passed. Restarting Session');
      ctx.session.user = null
    } else {
      console.log(`Only ${diffMinutes.toFixed(1)} minutes passed`);
    }
  }

  

  
  if (!ctx.session.user) {
    console.log(ctx.session.lastActivity)

    if (ctx.from?.id) {
      const tgId = ctx.from.id.toString()
      const user = await UserService.getByTgId(tgId)

      if (!user) {
        

        const userData: Omit<User, "id"> = {
             email : null,
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name ?? '',
            foreCastSubscription: false,
            isSubscribedToForecast:false
        }

        const newUser = await UserService.create(userData)

        const tgData:Omit<TelegramAccount, "id"> = {
            firstName: ctx.from.first_name,
            isBlocked:false,
            lastName: ctx.from.last_name??'',
            userName: ctx.from.username??'',
            telegramId: ctx.from.id.toString(),
            userId: newUser.id
        }

        const newTgAccount = TelegramAccountService.create(tgData)

        ctx.session.user = await UserService.getById(newUser.id as string)
      }
      else{
        ctx.session.user = user
      }

      

      console.log("User", ctx.session.user )

    }


  }
  // logger.info("ctx",ctx)

  ctx.session.lastActivity = new Date()
  await next();

}

