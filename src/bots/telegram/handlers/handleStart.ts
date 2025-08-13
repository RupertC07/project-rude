import { Context, Markup } from "telegraf";

const freshConfig = {
  message: `👋 Yo\\! Welcome welcome\\! I’m *Rude* — say it like *RUU\\-DE*, not rude rude 😎

I send crypto forecasts for *ADA* and *XRP* futures that you can follow if you subscribe\\.

I base my forecasts on Binance data — so it’s better if you use Binance too\\!

What do you want to do next\\?
👇 Choose an option below:`,
  buttons: [
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
    [{ type: 'callback', label: '🚫 Cancel Request', value: 'TRIGGER_CANCEL_REQUEST' }],
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
    [{ type: 'callback', label: '🔁 Re-Subscribe', value: 'TRIGGER_RESUBSCRIBE' }],
    [{ type: 'url', label: '👥 Join Our Community', value: 'https://discord.gg/ht7ynewgrs' }]
  ]
};


export const handleStart = async (ctx: Context) => {
  const config = freshConfig

  const inlineKeyboard = Markup.inlineKeyboard(
    config.buttons.map(row =>
      row.map(btn =>
        btn.type === 'callback'
          ? Markup.button.callback(btn.label, btn.value)
          : Markup.button.url(btn.label, btn.value)
      )
    )
  );

  await ctx.replyWithMarkdownV2(config.message, inlineKeyboard);
};
