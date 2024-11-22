import { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } from 'discord.js';
import { store_select_menu } from '../../utils/componenets/selectMenus';
import Embeds from '../../utils/componenets/embeds';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("store")
        .setDescription("Click to view store")
        .addStringOption(option => option
            .setName("shop_type")
            .setDescription("Type of shop you want to see")
            .addChoices([
                { name: "Rank", value: "rank" },
                { name: "Money", value: "money" },
                { name: "Coins", value: "coin" },
            ])
        ),
        
    async execute(interaction) {
        const storeType = store_select_menu
        const actionRow = new ActionRowBuilder().addComponents(storeType)
        const shop = interaction.options.getString('shop_type')
        let embed
        if(shop === "rank"){
            embed = Embeds.rankStore;
        }else if(shop === "money"){
            embed = Embeds.moneyStore;
        }else if(shop === "coin"){
            embed = Embeds.coinStore;
        }else{
            embed = new EmbedBuilder().setTitle("CCS STORE").setDescription("Select the store type from the below select menu")
        }
        await interaction.reply({components: [actionRow],embeds:[embed]});
    }

}

