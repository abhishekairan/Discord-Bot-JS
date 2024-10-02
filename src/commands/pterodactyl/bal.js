const pteroconsole = require('../../pterodactyl/console')
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const { roles,colors } = require('../../config.json') 
const { getWebSocket, cleanString } = require('../../pterodactyl/WebSocket')
const { getserverbyname } = require('../../database/getter')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription("Check your in-game balance")
        .addUserOption(option => option
            .setName('player')
            .setDescription("Player you want to check balance")
            .setRequired(false)
        ),
    async execute(interaction){
        // Setting the variables  
        const playerOption = interaction.options.getUser('player')
        var player


        // Checking if the player option has been passed in command
        if(playerOption){
            // if the user not having team role returning the error message 
            if(!interaction.member.roles.cache.has(roles.team)){
                embed = new EmbedBuilder()
                    .setTitle("Permission Denied")
                    .setDescription("Only staff member can check other user balance")
                    .setColor()
                return interaction.reply({embeds: [embed],ephemeral:true})
            }else{
                player = await interaction.guild.members.fetch(playerOption.id) 
            }
        }
        // setting player to command user if the player option has not passed in the command options
        else{
            player = interaction.member
        }
        // checking wheather the user has linekd role or command user has the team role
        if (player.roles.cache.has(roles.linked) || interaction.member.roles.cache.has(roles.team)){
            const {uuid} = await getserverbyname("CCS")
            const ws = await getWebSocket(uuid)
            await interaction.deferReply()
            ws.on('consoleMessage',(e) => {
                const consoleMSG = e.data // Getting current console message which has been send
                const cleanstr = cleanString(e.data) // Clearning the string by removing all the text formating
            
                // Checking if user exsist or not
                if(consoleMSG.includes("Player not found")){
                    const embed = new EmbedBuilder()
                        .setTitle("Player Not Found")
                        .setDescription(`Make sure you have linked your account!!!`)
                        .setColor(colors.red)
                    interaction.editReply({embeds: [embed]})
                    ws.close()
                }

                // Checking if the user balance 
                if(cleanstr.includes(`Balance of`) && cleanstr.includes(` ${player.nickname}`)){
                    const embed = new EmbedBuilder()
                        .setDescription(cleanstr)
                        .setColor(colors.green)
                    interaction.editReply({embeds:[embed]})
                    ws.close()
                }
            })
            try{
                await pteroconsole(uuid,`bal ${player.nickname}`) // sending the balance command to the server
            }catch{
                const embed = new EmbedBuilder()
                    .setTitle("Player Not Found")
                    .setDescription(`Make sure you have linked your account!!!`)
                    .setColor(colors.red)
                return interaction.reply({embeds: [embed]})
            }
                
        }
    }
}