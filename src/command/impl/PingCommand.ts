import Command from "../Command";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export class PingCommand extends Command {
    constructor() {
        super("ping", "measure the bot's latency");
    }

    override getCommand() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }

    override async execute(interaction: CommandInteraction) {
        const sent = await interaction.reply({
            content: "...",
            fetchReply: true
        });

        await interaction.editReply({
            content:
                `:: api latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms` +
                `\n:: ws latency: ${interaction.client.ws.ping}ms`
        });
    }
}
