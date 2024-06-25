import fs from "node:fs";
import toml from "toml";
import {logger} from "../snuggles";

interface Config {
    authorization: {
        discord_token: string
    }
}

let loadedConfig: Config;

export default function config(): Config {
    if (!loadedConfig) {
        let now = new Date();
        const configData = fs.readFileSync("config.toml").toString()
        loadedConfig = toml.parse(configData);
        logger.info(`Loaded config in ${new Date().getTime() - now.getTime()}ms`);
    }

    return loadedConfig;
}
