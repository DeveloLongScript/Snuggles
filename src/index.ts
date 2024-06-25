import {ConfigLoader} from "./config/ConfigLoader";

const config = new ConfigLoader("config.toml")
console.log(config.getConfig().authorization.discord_token)