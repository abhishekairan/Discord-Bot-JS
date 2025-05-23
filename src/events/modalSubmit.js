import { Events , EmbedBuilder } from 'discord.js';
export default {
    name: Events.InteractionCreate,
    async execute(interaction){
        // console.log(interaction)
        if(!interaction.isModalSubmit()) return;

        if(interaction.customId === 'answerModal'){
            
            // console.log(interaction)
            const answer = interaction.fields.getTextInputValue('answerModal_firstField');
            const msg = interaction.message
            const embed = new EmbedBuilder(msg.embeds[0])
            
            
            if(embed.data.fields){
                embed.data.fields = [{name: "Answer", value:answer ,inline: false}]
            }else{
                embed.addFields( {name: "Answer", value:answer ,inline: false}).setColor('00ff00')
            }
            // await msg.edit({embeds: [embed],components: []})
            
            await msg.edit({embeds: [embed]})
            await interaction.reply({content:`You answer has been recorded`,ephemeral: true})
        }
    }
}

