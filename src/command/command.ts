import {CacheType, ChatInputCommandInteraction, CommandInteraction, SlashCommandOptionsOnlyBuilder} from "discord.js";

export default class Command {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    getCommand(): SlashCommandOptionsOnlyBuilder {
        throw new Error(this.name + " Command getCommand method not implemented");
    }

    async execute(interaction: ChatInputCommandInteraction) {
        throw new Error(this.name + " Command execute method not implemented");
    }
}