const { ButtonBuilder, ButtonStyle } = require("discord.js");

const questionButton = new ButtonBuilder()
    .setLabel('Answer')
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('ansBTN')

const serverStartButton = new ButtonBuilder()
    .setLabel('Start')
    .setStyle(ButtonStyle.Success)
    .setCustomId('serverStartBTN')

const serverRestartButton = new ButtonBuilder()
    .setLabel('Restart')
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('serverRestartBTN')

const serverStopButton = new ButtonBuilder()
    .setLabel('Stop')
    .setStyle(ButtonStyle.Primary)
    .setCustomId('serverStopBTN')

const serverKillButton = new ButtonBuilder()
    .setLabel('Kill')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('serverKillBTN')

module.exports = {questionButton,serverStartButton,serverRestartButton,serverStopButton,serverKillButton}