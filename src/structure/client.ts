import {Client, ClientOptions} from "discord.js";
import {logger} from "../index";
import PingCommand from "../command/impl/pingCommand";
import config from "../config/config";
import {handleCommands} from "../util/commandUtils";
import {deployCommands} from "../util/restUtils";
import Command from "../command/command";

const commands: Command[] = [
  new PingCommand()
];

const listeners = [

];

export class Snuggles extends Client {
  constructor(options: ClientOptions) {
    super(options);
    this.init().catch(err => logger.error(err));
  }

  private async init() {
    this.once("ready", this.onReady);
  }

  private async onReady() {
    logger.info(`Logged in as ${this.user!.tag} (${this.user!.id})`);
    await this.registerCommands();
    await this.registerListeners();
  }

  private async registerCommands() {
    const startTime = new Date();

    // Register our commands with discord if enabled
    if (config().commands.deploy || config().commands.global) {
      await deployCommands(this, commands, config().commands.global ? undefined : config().commands.guild_id);
    }

    // Handle command execution with an event listener
    await handleCommands(this, commands);

    logger.info(`Registered ${commands.length} command(s) in ${new Date().getTime() - startTime.getTime()}ms`);
  }

  private async registerListeners() {
    const startTime = new Date();

    // TODO: Implement listeners and listener registration

    logger.info(`Registered ${listeners.length} listener(s) in ${new Date().getTime() - startTime.getTime()}ms`);
  }

  override login(token?: string) {
    return super.login(token);
  }
}
