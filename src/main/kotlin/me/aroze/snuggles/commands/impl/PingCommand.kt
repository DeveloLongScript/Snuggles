package me.aroze.snuggles.commands.impl

import me.aroze.snuggles.commands.BaseCommand
import net.dv8tion.jda.api.events.interaction.SlashCommandEvent

object PingCommand : BaseCommand("ping", "Pongs") {

    override fun onExecute(event: SlashCommandEvent) {
        val now = System.currentTimeMillis()
        event.reply("Pinging...").setEphemeral(true).queue { response ->
            response.editOriginalFormat("Pong! Took ${System.currentTimeMillis() - now}ms").queue()
        }
    }

}