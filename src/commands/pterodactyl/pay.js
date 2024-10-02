const { SlashCommandBuilder, EmbedBuilder, userMention } = require('discord.js')
const { getWebSocket,cleanString } = require('../../pterodactyl/WebSocket')
const  { getserverbyname } = require('../../database/getter')
const pteroconsole = require('../../pterodactyl/console')
const { logChannels, roles } = require('../../config.json')




module.exports= {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription("Pay the user in-game money through discord")
        .addUserOption(option => option
            .setName("player")
            .setDescription("Player which you want pay. Don't use command again if the previous transaction is not completed")
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName("amount")
            .setDescription("Amount of money you want to pay")
            .setRequired(true)
        ),
    async execute(interaction) {
        // Creating Variables to storing information 
        const { uuid } = await getserverbyname('CCS') // UUID of the main server
        const amount = interaction.options.getInteger('amount') // amount to paid
        const user = interaction.member // member which is paying
        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id) // player to be paid
        const logchannel = await interaction.guild.channels.fetch(logChannels.pay) // Channel which will log the transactions
        let balance = 0// Balance of the user after paying
        if(!(user.roles.cache.has(roles.linked)) || !(player.roles.cache.has(roles.linked))){
            return interaction.reply({content:"Player not found. Make sure you both have linked your account!!!",ephemeral:true})
        }
        const ws = await getWebSocket(uuid) // Web socket connection to communicate with server 

        // Defering the interaction reply to edit it later according to the conditions 
        await interaction.deferReply({ephemeral:true})

        // Adding a consoleMessage listner to websocket which will perform the authnetications and processes
        ws.on('consoleMessage', (e) => {
            const consoleMSG = e.data // Getting current console message which has been send
            const cleanstr = cleanString(e.data) // Clearning the string by removing all the text formating
            console.log(cleanstr) // Printing the actuall message to the console
            // Checking if user exsist or not
            if(consoleMSG.includes("Player not found")){
                interaction.editReply({content:"Player not found. Make sure you both have linked your account!!!",ephemeral:true})
                ws.close()
            }
            // Checking if the user has enough money to pay the player and taking the amount from the user 
            else if(consoleMSG.includes(`Balance of ${user.nickname}:`)){
                const balstr = cleanstr.split(' ')
                const userbal = balstr[balstr.length-1]
                balance = parseFloat(userbal.replace(/[$,]/g, ''))
                if(balance>amount){
                    ws.send(JSON.stringify({'event':'send command','args':[`eco take ${user.nickname} ${amount}`]}))
                }else{
                    interaction.editReply({content:`You are broke to perform this transaction`,ephemeral:true})
                    ws.close()
                }
            }
            // if the amount is deducated from the user then paying the amount to the player 
            else if(cleanstr.includes(`taken from ${user.nickname}`)){
                const deductamountstr = cleanstr.split(' ')
                // console.log(deductamountstr[deductamountstr.length-1]);
                balance = parseFloat(deductamountstr[deductamountstr.length-1])
                // console.log(newbalance);
                ws.send(JSON.stringify({'event':'send command','args':[`eco give ${player.nickname} ${amount}`]}))
            }
            // if player recived the money replying to them
            else if(cleanstr.includes(`added to ${player.nickname}`)){
                const msgarg = cleanstr.split(' ')
                interaction.editReply({content:`Paid ${msgarg[0]} to ${player}`,ephemeral:false})
                const embed = new EmbedBuilder().setTimestamp().setDescription(`${user.nickname} paid ${amount} to ${player.nickname}`)
                ws.close()  
                logchannel.send({embeds:[embed]}) 
            }
        })
        await pteroconsole(uuid,`bal ${user.nickname}`)
    }

    }