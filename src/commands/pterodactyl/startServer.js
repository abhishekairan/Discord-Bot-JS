const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getter = require('../../database/getter');
require('dotenv').config();
const power = require('../../pterodactyl/power');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Server name")
    // sub command for power action on servers
    .addSubcommand(subcommand => subcommand
        .setName('power')
        .setDescription('Action you want to perform on server')
        .addStringOption(option => option
            .setName('servername')
            .setDescription("Server name which you want to start")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('action')
            .setDescription('Action you want to perform')
            .addChoices(
                {name: 'Start', value: 'start'},
                {name: 'Restart', value: 'restart'},
                {name: 'Stop', value: 'stop'},
                {name: 'Kill', value: 'kill'}
            )
            .setRequired(true)
        )
    )
    // Subcommand for executing commands on server
    .addSubcommand(subcommand => subcommand
        .setName("command")
        .setDescription("Execute a command to server")
        .addStringOption(option => option
            .setName('servername')
            .setDescription("Server name which you want to start")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('command')
            .setDescription("Command you want to exectue")
            .setRequired(true)
        )
    )
    // Subcommand for getting server info
    .addSubcommand(subcommand => subcommand
        .setName("info")
        .setDescription("Gives information about the server")
        .addStringOption(option => option
            .setName('servername')
            .setDescription("Server name which you want to start")
            .setRequired(true)
        )
    ),
    async execute(interaction){
        const embed = new EmbedBuilder()
        const cmd = interaction.options.getSubcommand()
        // console.log(interaction.options);
        const servername = interaction.options.getString('servername')
        const server = await getter.getserverbyname(servername)
        // console.log(server)
        if (server) {
            const serveridentifier = server.dataValues.identifier
            const action = interaction.options.getString('action')
            if (cmd === "power"){
                if (action === 'start'){
                    response = await power.start(serveridentifier)
                    console.log(response)
                    embed.setDescription(`Starting ${servername}`)
                    embed.setColor('48AF40')
                    await interaction.reply({embeds: [embed] })
                }else if (action === 'stop'){
                    response = await power.stop(serveridentifier)
                    embed.setDescription(`Stoping ${servername}`)
                    embed.setColor('48AF40')
                    await interaction.reply({embeds: [embed] })
                }else if (action === 'kill'){
                    response = await power.kill(serveridentifier)
                    embed.setDescription(`Killing ${servername}`)
                    embed.setColor('48AF40')
                    await interaction.reply({embeds: [embed]})
                }else if (action === 'restart'){
                    response = await power.restart(serveridentifier)
                    embed.setDescription(`Restarting ${servername}`)
                    embed.setColor('48AF40')
                    await interaction.reply({embeds: [embed] })
                }
            }
        }else{
            embed.setDescription("Server not found")
            embed.setColor("F30301")
            interaction.reply({embeds: [embed] ,ephemeral: true})
        }
    }
}