import { SlashCommandBuilder , EmbedBuilder } from "discord.js";
import { Channels } from "../../config.json";

module.exports = {
    data: new SlashCommandBuilder().setName("suggestion").setDescription("Suggest something to the server").addStringOption(option => 
        option.setName('message')
              .setDescription('The suggestion message')
              .setRequired(true) // Make it required or false if not mandatory
    ),
    async execute(interaction){
        const suggestionChannel = await interaction.guild.channels.fetch(Channels.suggestion)
        const embed = new EmbedBuilder().setAuthor({name: interaction.user.displayName, iconURL: interaction.user.avatarURL()}).setDescription(interaction.options.getString('message'))
        const msg = await suggestionChannel.send({embeds: [embed]});
        await msg.react('👍')
        await msg.react('👎')
        await interaction.reply({content:"Your Suggestion has been submitted",ephemeral: true})
    }
}