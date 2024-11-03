const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { Websocket, getSocketCredientials } = require("../../pterodactyl-api/Client/WebSocket");
const pteroconsole = require('../../pterodactyl-api/Client/console')
const { getserverbyname, getCurrentISTDate } = require("../../database/getter");
const {colors,roles} = require('../../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription("Add/Remove the premium ranks of the player")
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription("Add Premium rank to a player")
            .addUserOption(option => option
                .setName('player')
                .setDescription(`The player to which rank should be given`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("rank")
                .setDescription("Select the rank which you want to give")
                .setChoices(
                    {name:"Knight",value:"vip"},
                    {name:"Warrior",value:"vip+"},
                    {name:"Emperor",value:"vip++"},
                )
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName("duration")
                .setDescription("Duration of the rank in days")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription("remove the rank of the player")
            .addUserOption(option => option
                .setName('player')
                .setDescription(`The player whoes rank you want to remove`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("rank")
                .setDescription("Rank which you want to remove from the player")
                .setChoices(
                    {name:"Knight",value:"vip"},
                    {name:"Warrior",value:"vip+"},
                    {name:"Emperor",value:"vip++"},
                )
                .setRequired(true)
            )
        ),

    async execute(interaction){
        // Checking if command is executed by manager or not
        if(!interaction.member.roles.cache.has(roles.manager)) {
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed],ephemeral: true})
        }

        // Checking if player has linked role or not
        const player = await interaction.guild.members.fetch(interaction.options.getUser('player').id)
        if(!player.roles.cache.has(roles.linked)){
            const embed = new EmbedBuilder().setTitle("Player not linked").setDescription(`${player} has not linekd his account yet. Can't perform the transaction`).setColor(colors.red)
            return interaction.reply({embeds: [embed]})
        }

        const cmd = interaction.options.getSubcommand()
        const {uuid} = await getserverbyname('CCS')
        const creds = await getSocketCredientials(uuid)
        const ws = new Websocket(creds).setLuckPermListner()
        const rank = interaction.options.getString('rank')
        const duration = interaction.options.getInteger('duration')
        const role = await interaction.guild.roles.fetch(roles[rank])

        await interaction.deferReply()
        
        // [LP] fammy001 now inherits permissions from vip++ (Emperor) for a duration of 1  hour in context global.
        // [LP] A user for fammy0011 could not be found.
        // [LP] fammy001 already temporarily inherits from vip (knight) in context global.
        // [LP] fammy001 now inherits permissions from vip+ (Warrior) for a duration of 1 week 3 days in context global.
        if(cmd==='add'){
            
            ws.on('luckperm',async (data) => {
                // console.log(data.message);
                if(data.message.includes('could not be found.')){
                    // console.log("Player not found matched");
                    const embed = new EmbedBuilder()
                        .setTitle("Player Not Found")
                        .setDescription(`Make sure you have linked your account!!!`)
                        .setColor(colors.red)
                    await interaction.editReply({embeds: [embed]})
                    ws.close()
                }
                else if(data.message.includes(player.nickname)){
                    if(data.message.includes(`now inherits permissions from ${rank}`)){
                        const embed = new EmbedBuilder().setTitle("Rank Added")
                            .setDescription(`Successfully gave ${role} rank to ${player} for ${duration} days`)
                            .setTimestamp()
                            .setColor(colors.green)
                            try {
                                await player.roles.add(role)
                            } catch (error) {}
                        await interaction.editReply({embeds:[embed]})
                    }else if(data.message.includes(`already temporarily inherits from ${rank}`)){
                        const embed = new EmbedBuilder()
                            .setTitle("Cannot add rank")
                            .setDescription(`${player} already has ${role}`)
                            .setColor(colors.red)
                        await interaction.editReply({embeds:[embed]})
                    }

                    ws.close()
                }
            })

            await pteroconsole(uuid,`lp user ${player.nickname} parent addtemp ${rank} ${duration}D`)
        }
        // [LP] fammy001 no longer temporarily inherits permissions from vip++ in context global.
        // [LP] fammy001 does not temporarily inherit from vip in context global.
        else if(cmd==='remove'){
            ws.on('luckperm',async (data) => {
                if(data.message.includes('could not be found.')){
                    const embed = new EmbedBuilder()
                        .setTitle("Player Not Found")
                        .setDescription(`Make sure you have linked your account!!!`)
                        .setColor(colors.red)
                    await interaction.editReply({embeds: [embed]})
                    ws.close()
                }
                else if(data.message.includes(player.nickname)){
                    if(data.message.includes(`no longer temporarily inherits permissions from ${rank}`)){
                        const embed = new EmbedBuilder().setTitle("Rank Removed")
                            .setDescription(`Successfully removed ${role} rank to ${player}`)
                            .setTimestamp()
                            .setColor(colors.green)
                        try {
                            await player.roles.remove(role)
                        } catch (error) {}
                        await interaction.editReply({embeds:[embed]})
                    }else if(data.message.includes(`does not temporarily inherit from ${rank}`)){
                        const embed = new EmbedBuilder()
                            .setTitle("Cannot remove rank")
                            .setDescription(`${player} do not has ${role}`)
                            .setColor(colors.red)
                        await interaction.editReply({embeds:[embed]})
                    }

                    ws.close()
                }
            })
            await pteroconsole(uuid,`lp user ${player.nickname} parent removetemp ${rank}`)
        }
        
        setTimeout(async () => {
            try {
                ws.close()  
            } catch (error) {}
        }, 5000);
    }
}