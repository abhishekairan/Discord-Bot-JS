import { SlashCommandBuilder , EmbedBuilder , ActionRowBuilder } from 'discord.js';
import {questionButton} from '../../utils/componenets/buttons.js';
import configs from "../../config.json" assert { type: 'json' };
const { Channels } = configs;

export default {
    data: new SlashCommandBuilder().setName('question').setDescription('Ask a question about server').addStringOption(option => 
        option.setName('question').setDescription('Your question???').setRequired(true)
    ),
    async execute(interaction){
        const question = interaction.options.getString('question')
        const questionChannel = await interaction.guild.channels.fetch(Channels.question)
        const ansBTN = questionButton
        const actionRow = new ActionRowBuilder()
            .addComponents([ansBTN])
        const embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.displayName}'s Question`, iconURL: interaction.user.avatarURL()})
            .setDescription(question)
            .setColor('ff0000')
        const msg = await questionChannel.send({embeds: [embed],components: [actionRow]})
        await interaction.reply({content:"Your Question has been submitted",ephemeral: true})
    }
}