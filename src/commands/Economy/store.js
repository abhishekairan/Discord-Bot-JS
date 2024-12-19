import { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } from 'discord.js';
import {store_select_menu} from '../../utils/componenets/selectMenus.js';
import Embeds from '../../utils/componenets/embeds.js';

export default {
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
                { name: "Keys", value: "keys" },
                { name: "Bundles", value: "bundles" },
            ])
        ),
        
    async execute(interaction) {
        // console.log(store_select_menu);
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
        }else if(shop === 'keys'){
            embed = Embeds.keyStore;
        }else if(shop === 'bundles'){
            embed = Embeds.bundleStore;
        }else{
            embed = new EmbedBuilder().setTitle("CCS STORE").setDescription("Select the store type from the below select menu")
        }
        await interaction.reply({components: [actionRow],embeds:[embed]});
    }

}

