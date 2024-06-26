import {GatewayIntentBits} from "discord.js";
import {Logger, ILogObj} from "tslog";
import config from "./config/config";
import {databaseConnect} from "./database/database";
import UserMessageService from "./database/services/userMessageService";
import {Snuggles} from "./structure/client";

export const logger: Logger<ILogObj> = new Logger();
export const userMessageService = new UserMessageService();

(async () => {
    const now = new Date();
    await databaseConnect(config().database.mongo_uri);
    logger.info(`Connected to database in ${new Date().getTime() - now.getTime()}ms`);

    // Set up the discord bot
    const client = new Snuggles({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    await client.login(config().authorization.discord_token)
})();
