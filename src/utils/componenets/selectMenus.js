import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';



// Select menu for shop 
const store_select_menu = new StringSelectMenuBuilder()
.setCustomId("store_select_menu")
.setPlaceholder("Which Store do you wanna see?")
.addOptions(
    new StringSelectMenuOptionBuilder().setLabel("Ranks").setValue("ranks").setDescription("Information about ranks in CCS"),
    new StringSelectMenuOptionBuilder().setLabel("Money").setValue("money").setDescription("Out of money? Check our money rates"),
    new StringSelectMenuOptionBuilder().setLabel("Club Coins").setValue("coins").setDescription("Hard to get hands on Club Coins? Check our prices of Club Coins"),
)


module.exports = { store_select_menu: store_select_menu }