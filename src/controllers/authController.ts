import { Request, Response } from "express";
import crypto from "crypto"

import * as DiscordAuth from "../config/discordOauth"
import axios from "axios";
// import { helper } from "../config/jwt";
// import { bot as telegramBot } from "../bots/telegram/index"

export const discordAuth = (req: Request, res: Response) => {

  const { state, platform } = req.query
  

  if (!state && platform=="telegram") {
    res.redirect("https://t.me/project_nex_bot")
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

    // const telegramPayload = helper.verify(state) as { chat_id?: string };

    // console.log("telegrampayload:", telegramPayload)
    const token = await DiscordAuth.oauth.tokenRequest({
      code: code,
      scope: "identify email",
      grantType: "authorization_code"
    })

    const user = await DiscordAuth.oauth.getUser(token.access_token)
    console.log("User:", user)
    console.log(token)

    res.json({
        user, token
    })

    // if (telegramPayload?.chat_id) {

    //   const bot =  await telegramBot.telegram.sendMessage(telegramPayload.chat_id, "You are now registered! You can now subscribe to our forecast! 🚀")
    //   console.log(bot)
    // }
    // res.redirect("https://t.me/project_nex_bot")

  } catch (error) {
    console.log(error)
    res.redirect("https://t.me/project_nex_bot")
  }
}


