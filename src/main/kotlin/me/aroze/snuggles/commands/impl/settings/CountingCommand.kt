package me.aroze.snuggles.commands.impl.settings

import instance
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import me.aroze.snuggles.commands.handler.Command
import me.aroze.snuggles.commands.handler.CommandEvent
import me.aroze.snuggles.menu.ChannelMenu
import me.aroze.snuggles.menu.MenuOption
import me.aroze.snuggles.models.ChannelData
import net.dv8tion.jda.api.Permission
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel

@Command(
    "counting",
    "Settings for counting",
    silentToggle = false
)
class CountingCommand {

    @Command(
        description = "Settings for the counting module.",
        permissions = [Permission.MANAGE_CHANNEL],
        silentToggle = false,
    )
    fun settings(event: CommandEvent) = runBlocking {
        launch {
            val channelData = ChannelData.getByChannel(event.message.channel.id)
            var count = channelData?.counting
            val channel = channelData?.channel?.let { instance.getGuildChannelById(it) } as? TextChannel

            print("$channelData $count $channel")

            ChannelMenu("Counting") {

                count?.allowConsecutiveUsers = it.settings.contains("consecutive_counting")
                count?.allowTalking = it.settings.contains("allow_speaking")
                count?.kinderMessages = it.settings.contains("kinder_messages")
                if (it.channel == null) {
                    count?.disabled = true
                } else count = ChannelData.create(it.channel.id, it.channel.guild.id).createCounting()

            }
                .addOption(MenuOption("Consecutive counting", "Allow users to count consecutively."))
                .addOption(MenuOption("Allow speaking", "Allow users to speak in the counting channel.", true))
                .addOption(MenuOption("Kinder messages", "Force Snuggles to remain respectful to users who mess up.", false))
                .setChannel(channel)
                .setSelectedOptions(count?.getSelectedOptions())
                .send(event.message)
        }
    }
}