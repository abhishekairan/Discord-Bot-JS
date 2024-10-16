const { Events } = require('discord.js')
const ModelBuilder = require('../utils/componenets/models')
const { roles } = require('../config.json')
const power = require('../pterodactyl-api/Client/power')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction){
        // console.log(interaction)
        if(!interaction.isButton()) return;
        const {customId} = interaction
        switch(customId){
            case "ansBTN":
                if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){

                    const userName = interaction.user.displayName
                    const modal = ModelBuilder("Answer?",`${userName}'s Question`,'answerModal')
                    await interaction.showModal(modal)

                }else {
                    await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
                }
            case "serverStartBTN":
                if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){
                    const uuid = interaction.message.embeds[0].fields[2].value
                    power.start(uuid)
                    await interaction.reply({content:"Server is starting...",ephemeral:true})
                }else {
                    await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
                }
            case "serverRestartBTN":
                if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){
                    const uuid = interaction.message.embeds[0].fields[2].value
                    power.restart(uuid)
                    await interaction.reply({content:"Server is restarting...",ephemeral:true})
                }else {
                    await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
                }
                
            case "serverStopBTN":
                if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){
                    const uuid = interaction.message.embeds[0].fields[2].value
                    console.log(uuid);
                    power.stop(uuid)
                    await interaction.reply({content:"Server is stoping...",ephemeral:true})
                }else {
                    await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
                }
                
            case "serverKillBTN":
                if(interaction.member.roles.cache.has(roles.manager) || interaction.member.roles.cache.has(roles.head_developer)){
                    const uuid = interaction.message.embeds[0].fields[2].value
                    console.log(uuid);
                    power.kill(uuid)
                    await interaction.reply({content:"Server is killed",ephemeral:true})
                }else {
                    await interaction.reply({content:`You can't answer to questions`,ephemeral: true})
                }
        }
    }
}