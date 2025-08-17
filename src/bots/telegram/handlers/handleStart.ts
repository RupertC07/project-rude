import { Context, Markup } from "telegraf";
import { MyContext } from "../types";
import { helper as JWT } from "../../../config/jwt";
import config from "../../../config";


export const handleStart = async (ctx: MyContext) => {


  const url = config.app.url
  const jwt = JWT.sign({telegramId: ctx.session.user?.telegramAccount?.telegramId, platform:"telegram",  userId: ctx.session.user?.id})

const freshConfig = {
  message: `👋 Yo\\! Welcome welcome\\! I’m *Rude* — say it like *RUU\\-DE*, not rude rude 😎

I send crypto forecasts for *ADA* and *XRP* futures that you can follow if you subscribe\\.

I base my forecasts on Binance data — so it’s better if you use Binance too\\!

What do you want to do next\\?
👇 Choose an option below:`,
  buttons: [
    !ctx.session.user?.discordAccount ? [{ type: 'url', label: '✅ Subscribe to Forecasts', value: `${url}auth/discord/?state=${jwt}&platform=telegram` }]:
    [{ type: 'callback', label: '✅ Subscribe to Forecasts', value: 'TRIGGER_SUBSCRIBE' }],
    [{ type: 'url', label: '👥 Join Our Community', value: 'https://discord.gg/ht7ynewgrs' }]
  ]
};

const notYetAllowedConfig = {
  message: `👋 You’ve already subscribed\\!

But you\\'re not allowed to receive forecasts *just yet* ⏳  
Hang tight — I’ll let you know once you're eligible 🤞

You can cancel your request below\\.  
*Please don't though* 🙏 \\(You know I care\\!\\)`,
  buttons: [
    [{ type: 'callback', label: '🚫 Cancel Request', value: 'TRIGGER_UNSUBSCRIBE' }],
    [{ type: 'url', label: '👥 Join Our Community', value: 'https://discord.gg/ht7ynewgrs' }]
  ]
};

const subscribedConfig = {
  message: `👋 Hey there\\! You’re already subscribed to *Rude* forecasts\\. 😎

If you want to stop getting updates\\.\\.\\. are you sure\\? Maybe you just *think* you want that\\. 🤔

But if you really don’t want to hear from me anymore, huhu 🥀

You can unsubscribe below, or join our community to stick around\\!`,
  buttons: [
    [{ type: 'callback', label: '❌ Unsubscribe', value: 'TRIGGER_UNSUBSCRIBE' }],
    [{ type: 'url', label: '👥 Join Our Community', value: 'https://discord.gg/ht7ynewgrs' }]
  ]
};

const unsubscribedConfig = {
  message: `😢 So you unsubscribed huh\\? That’s cool\\.\\.\\. totally cool\\.\\.\\.  
Definitely not crying in the corner or anything 😭

But hey\\.\\.\\. I’m still here\\.\\.\\. waiting 👀

Go hit that *Re\\-Subscribe* button \\—  
I missed you already 🥹`,
  buttons: [
    [{ type: 'callback', label: '🔁 Re-Subscribe', value: 'TRIGGER_SUBSCRIBE' }],
    [{ type: 'url', label: '👥 Join Our Community', value: 'https://discord.gg/ht7ynewgrs' }]
  ]
};


 


  let configMarkUp = freshConfig

  if (ctx.session.user?.isSubscribedToForecast &&  !ctx.session.user?.foreCastSubscription) {
    configMarkUp = notYetAllowedConfig
  }

  if (ctx.session.user?.isSubscribedToForecast && ctx.session.user?.foreCastSubscription ) {
    configMarkUp = subscribedConfig
  }

  if(!ctx.session.user?.isSubscribedToForecast && ctx.session.user?.foreCastSubscription){
    configMarkUp = unsubscribedConfig
  }



  const inlineKeyboard = Markup.inlineKeyboard(
    configMarkUp.buttons.map(row =>
      row.map(btn =>
        btn.type === 'callback'
          ? Markup.button.callback(btn.label, btn.value)
          : Markup.button.url(btn.label, btn.value)
      )
    )
  );

  await ctx.replyWithMarkdownV2(configMarkUp.message, inlineKeyboard);
};
