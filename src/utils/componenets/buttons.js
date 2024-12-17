import { ButtonBuilder, ButtonStyle } from "discord.js";

export const questionButton = new ButtonBuilder()
    .setLabel('Answer')
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('ansBTN')

export const serverStartButton = new ButtonBuilder()
    .setLabel('Start')
    .setStyle(ButtonStyle.Success)
    .setCustomId('serverStartBTN')

export const serverRestartButton = new ButtonBuilder()
    .setLabel('Restart')
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('serverRestartBTN')

export const serverStopButton = new ButtonBuilder()
    .setLabel('Stop')
    .setStyle(ButtonStyle.Primary)
    .setCustomId('serverStopBTN')

export const serverKillButton = new ButtonBuilder()
    .setLabel('Kill')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('serverKillBTN')

export default {questionButton,serverStartButton,serverRestartButton,serverStopButton,serverKillButton}