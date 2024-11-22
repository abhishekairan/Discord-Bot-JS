import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription("Ping the message"),
    async execute(interaction){
        await interaction.reply("Pong!");
    }
}