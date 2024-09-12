const { Events } = require('discord.js')
const ModelBuilder = require('../utils/models.js')
const { roles } = require('../config.json')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction){
        // console.log(interaction)
        if(!interaction.isButton()) return;

        if(interaction.customId === "ansBTN"){
            
            if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){

                const userName = interaction.user.displayName
                const modal = ModelBuilder("Answer?",`${userName}'s Question`,'answerModal')
                await interaction.showModal(modal)

            }else {
                await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
            }
        }
    }
}