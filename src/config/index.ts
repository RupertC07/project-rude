
import "dotenv/config";
import { url } from "inspector";

const config = {
  app: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV,
    log_level: process.env.LOG_LEVEL,
    url: process.env.TUNNEL_MODE && process.env.TUNNEL_MODE == "True"? 
    process.env.PORT_FORWARD_URL : process.env.HOST_URL

    
  },
  discord: {
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    client_id: process.env.DISCORD_CLIENT_ID,
    callback_uri:
      process.env.TUNNEL_MODE && process.env.TUNNEL_MODE == "True" ?
        process.env.DISCORD_CALLBACK_URI_TUNNEL :
        process.env.DISCORD_CALLBACK_URI,

  },
  telegram: {
    bot_key: process.env.TELEGRAM_BOT_TOKEN,
        webhook_url: process.env.TUNNEL_MODE && process.env.TUNNEL_MODE == "True" ?
        `${process.env.PORT_FORWARD_URL}telegram/webhook` :
        `${process.env.HOST_URL}telegram/webhook` ,
  },
  perplexity:{
    api_key: process.env.PERPLEXITY_API_KEY
  },
  binance:{
    api: process.env.BINANCE_API,
    interval: process.env.BINANCE_INTERVAL
  },
  db: {
    type: process.env.DATBASE_TYPE || "mongodb",
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
};

export default config;