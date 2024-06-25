import {Client, GatewayIntentBits, Routes} from "discord.js";
import { Logger, ILogObj } from "tslog";
import config from "./config/Config";
import {PingCommand} from "./command/impl/PingCommand";
import {deployCommands} from "./util/deployCommands";

export const logger: Logger<ILogObj> = new Logger();

const intents = [
    GatewayIntentBits.Guilds
];

async function registerCommands(client: Client) {
    let now = new Date();

    const commands = [
        new PingCommand()
    ];

    await deployCommands(client, commands, true, "1246242269154246796")
    logger.info(`Registered commands in ${new Date().getTime() - now.getTime()}ms`);
}

(async () => {
    const client = new Client({
        intents
    });

    await client.login(config().authorization.discord_token)
    logger.info(`Logged in as ${client.user!.tag}`);

    await registerCommands(client);
})();