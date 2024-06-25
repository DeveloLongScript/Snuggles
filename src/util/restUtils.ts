import {Client, Routes} from "discord.js";

export async function getRestPing(client: Client) {
    if (client.user === null) {
        throw new Error("login first?!?!?1/1/");
    }

    const start = Date.now();
    const data = await client.rest.get(
        Routes.user("@me"),
    );
    return Date.now() - start;
}