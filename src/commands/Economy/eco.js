import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import configs from '../../config.json' assert { type: 'json' };
const { roles, colors,logChannels } = configs
import { getPlayerUUID,getPlayerBalance } from '../../database/getter.js';
import { setPlayerClubCoinBalance, setPlayerPersonalBankBalance, setPlayerPurseBalance, updatePlayerBalances } from '../../database/setters.js';


export default {
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
            .setName('clubcoins')
            .setDescription("Do you want to change the money type to clubcoins?")
            .setRequired(false)
        ),


    async execute(interaction){
        // console.log('command is executed');
        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id)
        const amount = interaction.options.getInteger('amount')
        const action = interaction.options.getString('action')
        const moneyType = interaction.options.getBoolean('clubcoins')

        if (interaction.member.roles.cache.has(roles.manager)){
            if(!player.roles.cache.has(roles.linked)){
                const embed = new EmbedBuilder().setTitle("Player not linked").setDescription(`${player} has not linekd his account yet. Can't perform the transaction`).setColor(colors.red)
                return interaction.reply({embeds: [embed]})
            }
            await interaction.deferReply()
            
            const logchannel = await interaction.guild.channels.fetch(logChannels.pay) // Channel which will log the transactions
            const logEmbed = new EmbedBuilder().setTitle("Transaction Log").setAuthor({name:`${interaction.member.displayName}`,iconURL:interaction.member.displayAvatarURL()}).setTimestamp()
            var playerUUID
            var playerBalance
            try{
                playerUUID = await getPlayerUUID(player.nickname)
                playerBalance = await getPlayerBalance(playerUUID)
            }catch(err){
                console.log(err);
                const embed = new EmbedBuilder()
                    .setTitle("Player Not Found")
                    .setDescription(`Make sure both of you have linked your account!!!`)
                    .setColor(colors.red)
                return await interaction.reply({embeds: [embed]})
            }
            const embed = new EmbedBuilder().setTitle('Transaction Successfull!!!').setColor(colors.green)
            var newAmount = amount
            if(!moneyType){
                if(action==='give'){
                    newAmount = playerBalance.purseBalance + amount
                    await setPlayerPurseBalance(playerUUID,newAmount)
                    embed.setDescription(`${amount.toLocaleString('en-US')} 💵 has been added to ${player}'s Purse successfully`)
                    await interaction.editReply({embeds:[embed]})
                }else if(action==='take'){
                    if(playerBalance.purseBalance>amount){
                        newAmount = playerBalance.purseBalance - amount
                        await setPlayerPurseBalance(playerUUID,newAmount)
                        embed.setDescription(`${amount.toLocaleString('en-US')} 💵 has been taken from ${player}'s Purse successfully`)
                        await interaction.editReply({embeds:[embed]})
                    }else if(playerBalance.personalBankBalance>amount){
                        newAmount = playerBalance.personalBankBalance - amount
                        await setPlayerPersonalBankBalance(playerUUID,newAmount)
                        embed.setDescription(`${amount.toLocaleString('en-US')} 💵 has been taken from ${player}'s Bank successfully`)
                        await interaction.editReply({embeds:[embed]})
                    }else{
                        embed.setTitle('Transaction Failed!!!').setColor(colors.red).setDescription("Player don't have enough money to take")
                        return await interaction.editReply({embeds:[embed]})
                    }
                }else if(action==='set'){
                    await updatePlayerBalances(playerUUID,{purseBalance:amount,personalBankBalance:0})
                    embed.setDescription(`${player}'s Purse has been set to ${amount.toLocaleString('en-US')} 💵 successfully`)
                    await interaction.editReply({embeds:[embed]})
                }
            }else{
                if(action==='give'){
                    newAmount = playerBalance.clubCoinsBalance + amount
                    await setPlayerClubCoinBalance(playerUUID,newAmount)
                    embed.setDescription(`${amount.toLocaleString('en-US')}'s 🪙 has been added to ${player} successfully`)
                    await interaction.editReply({embeds:[embed]})
                }else if(action==='take'){
                    if(playerBalance.clubCoinsBalance>amount){
                        newAmount = playerBalance.clubCoinsBalance - amount
                        await setPlayerClubCoinBalance(playerUUID,newAmount)
                        embed.setDescription(`${amount.toLocaleString('en-US')}'s 🪙 has been taken from ${player} successfully`)
                        await interaction.editReply({embeds:[embed]})
                    }else{
                        embed.setTitle('Transaction Failed!!!').setColor(colors.red).setDescription("Player don't have enough club coins to take")
                        return await interaction.editReply({embeds:[embed]})
                    }
                }else if(action==='set'){
                    await setPlayerClubCoinBalance(playerUUID, amount)
                    embed.setDescription(`${player}'s account has been set to ${amount.toLocaleString('en-US')} 🪙 successfully`)
                    await interaction.editReply({embeds:[embed]})
                }
            }
            
            logEmbed.setDescription(`Action performed by: ${interaction.member}`).addFields([
                {name:'player',value:`${player} (${player.nickname})`},
                {name:'amount',value:`${amount.toLocaleString('en-US')} ${moneyType ? '🪙' : '💵'}`},
                {name:'action',value:action}
            ])  
            return await logchannel.send({embeds:[logEmbed]})

        }else{
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed]})
        }

    }
}