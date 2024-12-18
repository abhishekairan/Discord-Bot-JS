import { SlashCommandBuilder, EmbedBuilder, Embed } from 'discord.js';
import  { getPlayerUUID,getPlayerBalance } from '../../database/getter.js';
import configs from '../../config.json' assert { type: 'json' };
import {setPlayerPersonalBankBalance,setPlayerPurseBalance} from '../../database/setters.js';
const { logChannels, roles, colors } = configs




export default {
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
        )
        .addStringOption(option => option
            .setName('from')
            .setDescription("From which account you want to transfer money")
            .setChoices(
                {name:'Purse',value:'purse'},
                {name:'Bank',value:'bank'}
            )
            .setRequired(true)
        ),
    async execute(interaction) {
        // Creating Variables to storing information 
        const amount = interaction.options.getInteger('amount') // amount to paid
        const user = interaction.member // member which is paying
        const AccountType = interaction.options.getString('from')
        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id) // player to be paid
        const logchannel = await interaction.guild.channels.fetch(logChannels.pay) // Channel which will log the transactions
        let balance = 0// Balance of the user after paying
        if(!(user.roles.cache.has(roles.linked)) || !(player.roles.cache.has(roles.linked))){
            return interaction.reply({content:`Make sure you both have linked your account!!!`})
        }
        let playerUUID
        let userUUID
        try{
            playerUUID = await getPlayerUUID(player.nickname)
            userUUID = await getPlayerUUID(user.nickname)
        }catch{
            const embed = new EmbedBuilder()
                .setTitle("Player Not Found")
                .setDescription(`Make sure both of you have linked your account!!!`)
                .setColor(colors.red)
            return await interaction.reply({embeds: [embed]})
        }
        // Defering the interaction reply to edit it later according to the conditions 
        await interaction.deferReply()

        // Checking the balance of user to performance the transaction, if user have enough balance deduct the amount to be paid from the user account
        const userBalance = await getPlayerBalance(userUUID)
        const playerBalance = await getPlayerBalance(playerUUID)
        if(AccountType==='purse'){
            const embed = new EmbedBuilder()
            if(userBalance.purseBalance >= amount){
                await setPlayerPurseBalance(userUUID,userBalance.purseBalance-amount)
                await setPlayerPurseBalance(playerUUID,playerBalance.purseBalance+amount)
                embed.setTitle('Transaction Successfull!!!').setColor(colors.green).setDescription(`You paid ${player} ${amount.toLocaleString('en-US')} 💵 from your purse`)
                const logembed = new EmbedBuilder().setTimestamp().setDescription(`${user} paid ${amount.toLocaleString('en-US')} to ${player} from purse`)  
                await logchannel.send({embeds:[logembed]}) 
            }else{
                embed.setTitle('Transaction Failed!!!').setColor(colors.red).setDescription("You don't have enough money to perform this transaction")
            }
            return await interaction.editReply({embeds: [embed]})
        }else if(AccountType==='bank'){
            const embed = new EmbedBuilder()
            if(userBalance.personalBankBalance >= amount){
                await setPlayerPurseBalance(userUUID,userBalance.personalBankBalance-amount)
                await setPlayerPurseBalance(playerUUID,playerBalance.purseBalance+amount)
                embed.setTitle('Transaction Successfull!!!').setColor(colors.green).setDescription(`You paid ${player} ${amount.toLocaleString('en-US')} 💵 from your Bank`)
            }else{
                embed.setTitle('Transaction Failed!!!').setColor(colors.red).setDescription("You don't have enough money to perform this transaction")
            }
            return await interaction.editReply({embeds: [embed]})
        }
    }
}