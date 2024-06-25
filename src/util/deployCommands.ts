import Command from "../command/Command";
import {logger} from "../snuggles";
import {Client, Events, Routes} from "discord.js";

/**
 * Register commands on a client instance
 * @param client
 * @param commands
 * @param deploy
 * @param guildId
 */
export async function deployCommands(
    client: Client,
    commands: Command[],
    deploy: boolean = false,
    guildId?: number | string
) {
    // Deploy commands
    if (deploy) {
        let commandsData = commands.map(command => command.getCommand().toJSON());

        if (guildId) {
            const data = await client.rest.put(
                Routes.applicationGuildCommands(client.user!.id, guildId.toString()),
                { body: commandsData }
            );

            logger.debug("Deployed", commandsData.length, "commands to guild", guildId);
        } else {
            const data = await client.rest.put(
                Routes.applicationCommands(client.user!.id),
                { body: commandsData }
            );

            logger.debug("Deployed", commandsData.length, "commands globally");
        }

        // logger.debug("API Res:", JSON.stringify(data));
    }

    // Handle command execution
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        const command = commands.find(command => command.name === commandName);
        if (!command) return;

        command.execute(interaction)
            .then(() => logger.debug(`Command ${commandName} executed`))
            .catch((err) => {
                const referenceId = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, "0");

                logger.error(`Error executing command ${commandName}. Ref ID: ${referenceId}`, err);
                interaction.reply({ content: `There was an error while executing the command \n> Ref ID: ${referenceId}`, ephemeral: true });
            });
    })
}