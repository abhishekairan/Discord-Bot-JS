const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const { store_select_menu } = require('../../utils/componenets/selectMenus')
const Embeds = require('../../utils/componenets/embeds')

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
        let embed = new EmbedBuilder().setTitle("CCS STORE").setDescription("Select the store type from the below select menu")
        switch(shop){
            case "rank":
                embed = Embeds.rankStore;
            case "money":
                embed = Embeds.moneyStore;
            case "coin":
                embed = Embeds.coinStore;
        }
        await interaction.reply({components: [actionRow],embeds:[embed]});
    }

}

