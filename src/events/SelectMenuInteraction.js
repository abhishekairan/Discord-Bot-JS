import { Events } from "discord.js";
import Embeds from '../utils/componenets/embeds.js';


export default {
    name: Events.InteractionCreate,
    async execute(interaction){
        // console.log("new interaction create");
        // console.log(interaction);
        if(!interaction.isStringSelectMenu()) return;
        
        if(interaction.customId === "store_select_menu"){
            // console.log("found interactions");
            const type = interaction.values[0]
            switch(type){
                // If money is selected 
                case "money":
                    await interaction.message.edit({embeds: [Embeds.moneyStore],components:[interaction.message.components[0]]})
                    return interaction.deferUpdate()
                // for coin store
                case "coins":
                    await interaction.message.edit({embeds: [Embeds.coinStore],components:[interaction.message.components[0]]})
                    return interaction.deferUpdate()
                // for coin store
                case "ranks":
                    await interaction.message.edit({embeds: [Embeds.rankStore],components:[interaction.message.components[0]]})
                    return interaction.deferUpdate()
            }
        }
    }
}