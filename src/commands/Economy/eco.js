import { SlashCommandBuilder, EmbedBuilder, Embed } from 'discord.js';
import { roles, colors,logChannels } from '../../config.json';
import { getSocketCredientials,Websocket } from '../../pterodactyl-api/Client/WebSocket';
import { getserverbyname } from '../../database/getter';
import pteraconsole from '../../pterodactyl-api/Client/console';

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
        )
        .addBooleanOption(option => option
            .setName('point')
            .setDescription("Do you want to change the money type to points?")
            .setRequired(false)
        ),


    async execute(interaction){

        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id)
        const amount = interaction.options.getInteger('amount')
        const action = interaction.options.getString('action')
        const moneyType = interaction.options.getBoolean('point')

        if (interaction.member.roles.cache.has(roles.manager)){
            if(!player.roles.cache.has(roles.linked)){
                const embed = new EmbedBuilder().setTitle("Player not linked").setDescription(`${player} has not linekd his account yet. Can't perform the transaction`).setColor(colors.red)
                return interaction.reply({embeds: [embed]})
            }
            await interaction.deferReply()
            const {uuid} = await getserverbyname("CCS")
            
            const logchannel = await interaction.guild.channels.fetch(logChannels.pay) // Channel which will log the transactions
            const logEmbed = new EmbedBuilder().setTitle("Transaction Log").setAuthor({name:`${interaction.member.displayName}`,iconURL:interaction.member.displayAvatarURL()}).setTimestamp()
            
            const creds = await getSocketCredientials(uuid)
            if(!moneyType){
                const ws = await new Websocket(creds).setEcoListners()
            
                // player not found listner
                ws.on('player not found',(e) => {
                    interaction.editReply({content:`Make sure ${player.nickname} have linked your account!!!`})
                    ws.close()
                })

                // Money add listner
                ws.on('eco recived',(data) => {
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
                }, 5000);
            }else{
                const ws = await new Websocket(creds).setPointListner()

                // player not found listner
                ws.on('player not found',(e) => {
                    interaction.editReply({content:`Make sure ${player.nickname} have linked your account!!!`})
                    ws.close()
                })

                // point given listner
                ws.on('point given', (data) => {
                    console.log(data.message);
                    if(data.message.includes(`${player.nickname}`) && amount === data.amount){
                        const embed = new EmbedBuilder()
                        embed.setTitle("Transaction Successfull").setDescription(`ᴄʟᴜʙ ᴄᴏɪɴ ${player.nickname} was given ${amount} Points.`).setColor(colors.green)
                        interaction.editReply({embeds: [embed]})
                        ws.close()
                        logEmbed.setDescription(data.message)
                        logchannel.send({embeds:[logEmbed]}) 
                    }
                })

                // Point took listner
                ws.on('point took', (data) => {
                    if(data.message.includes(`${player.nickname}.`) && amount === data.amount){
                        const embed = new EmbedBuilder()
                        embed.setTitle("Transaction Successfull").setDescription(`ᴄʟᴜʙ ᴄᴏɪɴ Took ${amount} Point from ${player.nickname}.`).setColor(colors.green)
                        interaction.editReply({embeds: [embed]})
                        ws.close()
                        logEmbed.setDescription(data.message)
                        logchannel.send({embeds:[logEmbed]}) 
                    }
                })

                // Point setting listner
                ws.on('point set',(data) => {
                    if(data.message.includes(`${player.nickname}`) && amount===data.amount){
                        const embed = new EmbedBuilder()
                        embed.setTitle("Transaction Successfull").setDescription(`ᴄʟᴜʙ ᴄᴏɪɴ Set the Points of ${player.nickname} to ${amount}.`).setColor(colors.green)
                        interaction.editReply({embeds: [embed]})
                        ws.close()
                        logEmbed.setDescription(data.message)
                        logchannel.send({embeds:[logEmbed]}) 
                    }
                })

                // Reseting player points
                ws.on('point reset',(data) => {
                    if(data.message.includes(`${player.nickname}.`)){
                        const embed = new EmbedBuilder()
                        embed.setTitle("Transaction Successfull").setDescription(`ᴄʟᴜʙ ᴄᴏɪɴ Reset the Points for ${player.nickname}.`).setColor(colors.green)
                        interaction.editReply({embeds: [embed]})
                        ws.close()
                        logEmbed.setDescription(data.message)
                        logchannel.send({embeds:[logEmbed]}) 
                    }
                })
                if (action == 'give'){
                    pteraconsole(uuid,`points give ${player.nickname} ${amount}`)
                }else if (action == 'take'){
                    pteraconsole(uuid,`points take ${player.nickname} ${amount}`)
                }else if (action == 'set'){
                    pteraconsole(uuid,`points set ${player.nickname} ${amount}`)
                }else if (action == 'reset'){
                    pteraconsole(uuid,`points reset ${player.nickname}`)
                }
                setTimeout(async () => {
                    try {
                        ws.close()  
                    } catch (error) {}
                }, 5000);

            }
        }else{
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed]})
        }

    }
}