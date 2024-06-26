import {
    CacheType,
    ChatInputCommandInteraction,
    CommandInteraction, Interaction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";

/**
 * Represents a command that can be executed by the bot
 *
 * @class Command
 * @constructor
 * @param {string} name - The name of the command
 * @param {string} description - The description of the command
 * @param {boolean} defaultSilent - Whether the command should reply silently by default
 * @param {boolean} showSilentToggle - Whether the command should show the toggle to switch between silent and non-silent replies
 */
export default class Command {
    name: string;
    description: string;
    private readonly defaultSilent: boolean;
    private readonly showSilentToggle: boolean;

    constructor(name: string, description: string, defaultSilent: boolean = false, showSilentToggle: boolean = true) {
        this.name = name;
        this.description = description;
        this.defaultSilent = defaultSilent;
        this.showSilentToggle = showSilentToggle;
    }

    getParsedCommand(): SlashCommandOptionsOnlyBuilder  {
        const command = this.getCommand();
        if (!this.showSilentToggle) return command;

        command.addBooleanOption(option => option
            .setName("silent")
            .setDescription(`Whether the command should only show its response to you. Default for this command: ${this.defaultSilent}`)
            .setRequired(false)
        );

        return command;
    }

    getCommand(): SlashCommandOptionsOnlyBuilder  {
        throw new Error(this.name + " Command getCommand method not implemented");
    }

    async execute(interaction: ChatInputCommandInteraction) {
        throw new Error(this.name + " Command execute method not implemented");
    }

    getSilent(interaction: ChatInputCommandInteraction): boolean {
        const silent = interaction.options.getBoolean("silent", false)
        return silent === null ? this.defaultSilent : silent;
    }
}