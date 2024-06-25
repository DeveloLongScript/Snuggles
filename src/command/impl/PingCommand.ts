import Command from "../Command";
import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {FancyEmbed} from "../../util/fancyEmbed";
import {getRestPing} from "../../util/restUtils";

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
        const now = Date.now();
        const timeSent = interaction.createdTimestamp;
        const gatewayPing = interaction.client.ws.ping;

        const description = [
            `:satellite: **Discord Latency**`,
            ` - **Gateway Latency** ${gatewayPing}ms`,
            ` - **Rest Latency** <a:loading:1255273134769180692>`,
            ``,
            `:stopwatch: **Internal Latency**`,
            ` - **Database Latency** <a:loading:1255273134769180692>`,
            ``,
            ` - **Total Command Latency** ${now - timeSent}ms`
        ]

        const embed = new FancyEmbed()
            .setTitle(`<:ping:1255273004292771931>  Pinging...`)
            .setDescription(description.join("\n"))

        const sent = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        const restPing = await getRestPing(interaction.client);
        description[2] = ` - **Rest Latency** ${restPing}ms`
        embed.setDescription(description.join("\n"));
        embed.setTitle(`<:ping:1255273004292771931>  Pinging...`)

        const dbPing = 10; // todo
        description[5] = ` - **Database Latency** ${dbPing}ms`
        embed.setDescription(description.join("\n"));
        embed.setTitle(`<:ping:1255273004292771931>  Pong!`)

        await interaction.editReply({
            embeds: [embed]
        });
    }
}
