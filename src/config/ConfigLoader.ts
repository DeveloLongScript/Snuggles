import Config from "./Config";
import toml from "toml";
import fs from "node:fs";

export class ConfigLoader {
    private config: Config | null = null;
    private readonly configPath: string;

    constructor(configPath: string) {
        this.configPath = configPath;
        this.loadConfig()
    }

    private loadConfig() {
        const configData = fs.readFileSync(this.configPath).toString()
        this.config = toml.parse(configData);
    }

    getConfig() {
        if (!this.config) {
            throw Error(`you dont have a config dumbass. path: ${this.configPath}`)
        }

        return this.config
    }

}