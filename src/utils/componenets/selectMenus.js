import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';



// Select menu for shop 
export const store_select_menu = new StringSelectMenuBuilder()
.setCustomId("store_select_menu")
.setPlaceholder("Which Store do you wanna see?")
.addOptions(
    new StringSelectMenuOptionBuilder().setLabel("Ranks").setValue("ranks").setDescription("Information about ranks in CCS"),
    new StringSelectMenuOptionBuilder().setLabel("Money").setValue("money").setDescription("Out of money? Check our money rates"),
    new StringSelectMenuOptionBuilder().setLabel("Club Coins").setValue("coins").setDescription("Hard to get hands on Club Coins? Check our prices of Club Coins"),
    new StringSelectMenuOptionBuilder().setLabel("Keys").setValue("keys").setDescription("Haven't got desired item from the crate? Want to open more crates? Check out key prices"),
    new StringSelectMenuOptionBuilder().setLabel("Bundles").setValue("bundles").setDescription("Looking for offers to save money on? Checkout Bundles, Get the most in the least!!!"),
)


export default {store_select_menu}