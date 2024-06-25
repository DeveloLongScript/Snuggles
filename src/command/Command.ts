import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default class Command {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    getCommand(): SlashCommandBuilder {
        throw new Error(this.name + " Command getCommand method not implemented");
    }

    async execute(interaction: CommandInteraction) {
        throw new Error(this.name + " Command execute method not implemented");
    }
}