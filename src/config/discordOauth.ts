import crypto from "crypto"
import DiscordOauth2  from "discord-oauth2"
import config from ".";

export const oauth = new DiscordOauth2({
	clientId: config.discord.client_id as string,
	clientSecret: config.discord.client_secret as string,
	redirectUri: config.discord.callback_uri as string,
});

export const url = oauth.generateAuthUrl({
	scope: ["identify", "guilds"],
	state: crypto.randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
});
