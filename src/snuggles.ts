import {Client, GatewayIntentBits} from "discord.js";
import { Logger, ILogObj } from "tslog";
import config from "./config/config";
import PingCommand from "./command/impl/pingCommand";
import {deployCommands} from "./util/deployCommands";
import Database from "./database/database";

export const logger: Logger<ILogObj> = new Logger();
export const database = new Database();

const intents = [
    GatewayIntentBits.Guilds
];

async function registerCommands(client: Client) {
    let now = new Date();

    const commands = [
        new PingCommand()
    ];

    await deployCommands(client, commands, config().commands.global, config().commands.global ? undefined : config().commands.guild_id);
    logger.info(`Registered ${commands.length} commands in ${new Date().getTime() - now.getTime()}ms`);
}

(async () => {
    const now = new Date();
    await database.connect(config().database.mongo_uri, config().database.database_name);
    logger.info(`Connected to database in ${new Date().getTime() - now.getTime()}ms`);

    // Set up the discord bot
    const client = new Client({
        intents
    });

    await client.login(config().authorization.discord_token)
    logger.info(`Logged in as ${client.user!.tag}`);

    // Register commands
    await registerCommands(client);
})();