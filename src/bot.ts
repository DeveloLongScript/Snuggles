import {Client, GatewayIntentBits} from "discord.js";
import {logger} from "./snuggles";
import {PingCommand} from "./command/impl/PingCommand";
import {deployCommands} from "./util/deployCommands";
import config from "./config/Config";

// export default class Bot {
//     private readonly client: Client;
//     private readonly startTime: Date = new Date();
//
//     constructor(intents: GatewayIntentBits[]) {
//
//         this.client = new Client({
//             intents
//         });
//
//         this.client.login(config().authorization.discord_token)
//             .then(() => {
//                 if (!this.client.user) {
//                     throw Error("no user what the frick.")
//                 }
//
//                 logger.info(`Logged in as ${this.client.user.tag}`);
//                 this.registerCommands();
//             });
//     }
//
//     registerCommands() {
//         let now = new Date();
//         const commands = [
//             new PingCommand()
//         ];
//         deployCommands(this.client, commands, true, "1246242269154246796").then(() => {
//             logger.info(`Registered commands in ${new Date().getTime() - now.getTime()}ms`);
//         });
//     }
// }