const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const { roles, colors,logChannels } = require('../../config.json')
const { getSocketCredientials,Websocket } = require('../../pterodactyl/WebSocket')
const { getserverbyname } = require('../../database/getter')
const pteraconsole = require('../../pterodactyl/console')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eco')
        .setDescription("Edit the amount of a player has")
        .addStringOption(option => option
            .setName('action')
            .setDescription('Action to perform')
            .setRequired(true)
            .addChoices(
                { name: 'give', value: 'give' },
                { name: 'take', value: 'take' },
                { name: 'set', value: 'set' },
                { name: 'reset', value: 'reset' },
            )
        )
        .addUserOption(option => option
            .setName('player')
            .setDescription(`The player's money you want to edit`)
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('The amount of money you want to give/take/set')
            .setRequired(true)
        ),

    async execute(interaction){
        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id)
        const amount = interaction.options.getInteger('amount')
        const action = interaction.options.getString('action')
        if (interaction.member.roles.cache.has(roles.manager)){
            if(!player.roles.cache.has(roles.linked)){
                const embed = new EmbedBuilder().setTitle("Player not linked").setDescription(`${player} has not linekd his account yet. Can't perform the transaction`).setColor(colors.red)
                return interaction.reply({embeds: [embed]})
            }
            await interaction.deferReply()

            const {uuid} = await getserverbyname("CCS")
            const creds = await getSocketCredientials(uuid)
            const ws = await new Websocket(creds).setEcoListners()
            const logchannel = await interaction.guild.channels.fetch(logChannels.pay) // Channel which will log the transactions

            const logEmbed = new EmbedBuilder().setTitle("Transaction Log").setAuthor({name:`${interaction.member.displayName}`,iconURL:interaction.member.displayAvatarURL()}).setTimestamp()

            // player not found listner
            ws.on('player not found',(e) => {
                interaction.editReply({content:`Make sure ${player.nickname} have linked your account!!!`})
                ws.close()
            })

            // Money add listner
            ws.on('eco recived',(data) => {
                console.log(data);
                if(data.message.includes(`${player.nickname}`) && amount === data.amount){
                    const embed = new EmbedBuilder()
                    embed.setTitle("Transaction Successfull").setDescription(data.message).setColor(colors.green)
                    interaction.editReply({embeds: [embed]})
                    ws.close()
                    logEmbed.setDescription(data.message)
                    logchannel.send({embeds:[logEmbed]}) 
                }
            })

            // Money taken listner
            ws.on('eco taken',(data)=>{
                if(data.message.includes(`${player.nickname}`) && amount === data.amount){
                    const embed = new EmbedBuilder()
                    embed.setTitle("Transaction Successfull").setDescription(data.message).setColor(colors.green)
                    interaction.editReply({embeds: [embed]})
                    ws.close()
                    logEmbed.setDescription(data.message)
                    logchannel.send({embeds:[logEmbed]})
                }
            })

            // Money set listner
            ws.on('eco set',(data)=>{
                if(data.message.includes(`${player.nickname}'s` && amount === data.amount)){
                    const embed = new EmbedBuilder()
                    embed.setTitle("Transaction Successfull").setDescription(data.message).setColor(colors.green)
                    interaction.editReply({embeds: [embed]})
                    ws.close()
                    logEmbed.setDescription(data.message)
                    logchannel.send({embeds:[logEmbed]}) 
                }
            })

            if (action == 'give'){
                pteraconsole(uuid,`eco give ${player.nickname} ${amount}`)
            }else if (action == 'take'){
                pteraconsole(uuid,`eco take ${player.nickname} ${amount}`)
            }else if (action == 'set'){
                pteraconsole(uuid,`eco set ${player.nickname} ${amount}`)
            }else if (action == 'reset'){
                pteraconsole(uuid,`eco reset ${player.nickname} ${amount}`)
            }
            setTimeout(async () => {
                try {
                    ws.close()  
                } catch (error) {}
            }, 10000);
        }else{
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed]})
        }

    }
}