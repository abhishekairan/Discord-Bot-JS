import pteroconsole from '../../pterodactyl-api/Client/console.js';
import { SlashCommandBuilder, EmbedBuilder, Embed } from 'discord.js';
import configs from '../../config.json' assert { type: 'json' };
const { roles,colors } = configs
import { Websocket,getSocketCredientials } from '../../pterodactyl-api/Client/WebSocket.js';
import { getserverbyname,getPlayerUUID,getPlayerBalance } from '../../database/getter.js';
import { PanelDB } from '../../database/models.js';

export default {
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
                const embed = new EmbedBuilder()
                    .setTitle("Permission Denied")
                    .setDescription("Only staff member can check other user balance")
                    .setColor(colors.red)
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
            // getting the player uuid from the database 
            
            await interaction.deferReply()
            try{
                const playerUUID = await getPlayerUUID(player.nickname)
                const playerBalance = await getPlayerBalance(playerUUID)
                // console.log(playerUUID);
                // console.log(playerBalance);
                const embed = new EmbedBuilder()
                    .setTitle(`${player.nickname}'s Balance`)
                    .setDescription(`
- **Purse** : ${playerBalance.purseBalance.toLocaleString('en-US')} 💵
- **Bank** : ${playerBalance.personalBankBalance.toLocaleString('en-US')} 💵
> **Total** : ${playerBalance.total.toLocaleString('en-US')} 💵

- **Club Coins** : ${playerBalance.clubcoinBalance.toLocaleString('en-US')} 🪙`
                    )
                    .setColor(colors.green)
                interaction.editReply({embeds:[embed]})
            }catch{
                const embed = new EmbedBuilder()
                    .setTitle("Player Not Found")
                    .setDescription(`Make sure you have linked your account!!!`)
                    .setColor(colors.red)
                return interaction.editReply({embeds: [embed]})
            }

        }
    }
}