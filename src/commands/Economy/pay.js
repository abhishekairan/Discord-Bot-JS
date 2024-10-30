const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Websocket,getSocketCredientials } = require('../../pterodactyl-api/Client/WebSocket')
const  { getserverbyname } = require('../../database/getter')
const pteroconsole = require('../../pterodactyl-api/Client/console')
const { logChannels, roles, colors } = require('../../config.json')




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
            return interaction.reply({content:`Make sure you both have linked your account!!!`})
        }
        const creds = await getSocketCredientials(uuid)
        const ws = await new Websocket(creds).setEcoListners() // Web socket connection to communicate with server 

        // Defering the interaction reply to edit it later according to the conditions 
        await interaction.deferReply()

        // Adding a consoleMessage listner to websocket which will perform the authnetications and processes

        // Checking the balance of user to performance the transaction, if user have enough balance deduct the amount to be paid from the user account
        ws.on('balanceof',(data)=>{
            if(data.message.includes(`${user.nickname}`)){
                if(data.balance>=amount){
                    ws.send(JSON.stringify({'event':'send command','args':[`eco take ${user.nickname} ${amount}`]})) // Deducting the amount from the user 
                }else{
                    interaction.editReply({content:`You are broke to perform this transaction`}) // User is broke
                    ws.close() // Closing connection 
                }
            }
        })

        // Checking if user money is deducted or not
        ws.on("eco taken",(data)=>{
            if(data.message.includes(`${user.nickname}`) && data.amount === amount){
                ws.send(JSON.stringify({'event':'send command','args':[`eco give ${player.nickname} ${amount}`]})) 
            }
        })

        // Checking if player recived money or not
        ws.on('eco recived',(data)=>{
            if(data.message.includes(`${player.nickname}`) && data.amount === amount){
                const embed = new EmbedBuilder().setTitle("Transaction Successfull").setDescription(`Paid ${data.message.split(' ')[0]} to ${player}`).setColor(colors.green)
                interaction.editReply({embeds: [embed]})
                const logembed = new EmbedBuilder().setTimestamp().setDescription(`${user.nickname} paid ${amount} to ${player.nickname}`)
                ws.close()  
                logchannel.send({embeds:[logembed]}) 
            }
        })

        ws.on('player not found',()=>{
            const embed = new EmbedBuilder()
                .setTitle("Player Not Found")
                .setDescription(`Make sure you have linked your account!!!`)
                .setColor(colors.red)
            interaction.editReply({embeds: [embed]})
            ws.close()
        })
        await pteroconsole(uuid,`bal ${user.nickname}`)
    }

    }