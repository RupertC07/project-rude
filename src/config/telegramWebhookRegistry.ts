import axios from 'axios';
import config from '.';
import logger from './logger';
import { log } from 'console';

export const setTelegramWebhook = async() =>{
  try {
    const url = `https://api.telegram.org/bot${config.telegram.bot_key}/setWebhook`;
    const response = await axios.post(url, {
      url: config.telegram.webhook_url
    });

    if (response.data && response.data.ok) {

        

        console.log("webhook", config.telegram.webhook_url)
    logger.info("Webhook: ", config.telegram.webhook_url)
      logger.info('✅ Telegram webhook registered successfully:', response.data);
    } else {
      logger.error('❌ Failed to register Telegram webhook:', response.data);
    }
  } catch (error) {
    logger.error('❌ Error setting Telegram webhook:', error);
  }
}


