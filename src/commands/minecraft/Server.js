import 'dotenv/config';
import WebSocket from 'ws';
import configs from '../../config.json' assert { type: 'json' };
const { panel,roles } = configs
import getter from '../../database/getter.js';
import power from '../../pterodactyl-api/Client/power.js';
import pteroconsole from '../../pterodactyl-api/Client/console.js';
import getservers from '../../pterodactyl-api/Application/getservers.js';
import {serverStartButton,serverRestartButton,serverStopButton,serverKillButton} from "../../utils/componenets/buttons.js";
import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder } from 'discord.js';

const server = await getter.getservers()
// console.log(server);
const serverName = server.map((e)=> {
    return {name: e.name,value: e.uuid}
})
// console.log(serverName);

const data = new SlashCommandBuilder()
.setName("server")
.setDescription("Server name")
.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// sub command for power action on servers
.addSubcommand(subcommand => subcommand
    .setName('power')
    .setDescription('Action you want to perform on server')
    .addStringOption(option => option
        .setName('servername')
        .setDescription("Server name which you want to start")
        .setRequired(true)
        .addChoices(serverName)
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
        .addChoices(serverName)
    )
    .addStringOption(option => option
        .setName('command')
        .setDescription("Command you want to exectue")
        .setRequired(true)
    )
)
// Subcommand for server informations
.addSubcommand(subcommand => subcommand
    .setName("info")
    .setDescription("Information about the server")
    .addStringOption(option => option
        .setName("servername")
        .setDescription("Name of the server you want to see")
        .setRequired(true)
        .addChoices(serverName)
    )
)
// console.log(...data.options);

export default {
    data: data,
    async execute(interaction){
        if(!interaction.member.roles.cache.has(roles.manager)) {
            const embed = new EmbedBuilder().setTitle("Permission Denied").setDescription("Only Managers are allowed to use this command")
            return interaction.reply({embeds: [embed],ephemeral: true})
        }
        // console.log(interaction);
        const embed = new EmbedBuilder()
        const cmd = interaction.options.getSubcommand()
        // console.log(interaction.options);
        const serveridentifier = interaction.options.getString('servername')
        const server = await getter.getserverbyuuid(serveridentifier)
        const servername = server.name
        // console.log(server)
        // console.log(serveridentifier)
        const action = interaction.options.getString('action')
        switch (cmd) {

            // If command power is selected 
            case "power":
                if (action === 'start'){
                    const response = await power.start(serveridentifier)
                    embed.setDescription(`Starting ${servername}`)
                    embed.setColor('48AF40')
                    return await interaction.reply({embeds: [embed] })
                }else if (action === 'stop'){
                    const response = await power.stop(serveridentifier)
                    embed.setDescription(`Stoping ${servername}`)
                    embed.setColor('48AF40')
                    return await interaction.reply({embeds: [embed] })
                }else if (action === 'kill'){
                    const response = await power.kill(serveridentifier)
                    embed.setDescription(`Killing ${servername}`)
                    embed.setColor('48AF40')
                    return await interaction.reply({embeds: [embed]})
                }else if (action === 'restart'){
                    const response = await power.restart(serveridentifier)
                    embed.setDescription(`Restarting ${servername}`)
                    embed.setColor('48AF40')
                    return await interaction.reply({embeds: [embed] })
                }


            // If user want to send command to the server 
            case "command":
                const command = interaction.options.getString('command')
                const response = await pteroconsole(serveridentifier, command)
                const req = await fetch(`https://panel.clubcolony.in/api/client/servers/${serveridentifier}/websocket`,{ method: "GET", headers: { Authorization: `Bearer ${panel.CLIENTKEY}`,Accept: "application/json" } });
                const res = await req.json();
                const { token, socket } = res.data;
                console.log(socket)
                const ws = new WebSocket(`${socket}`)
                ws.on('open',() => {
                    console.log("connection established")
                    ws.send(JSON.stringify({"event":"auth","args":[token]}))
                })
                ws.on('message',(msg) => {
                    message = JSON.parse(msg)
                    if (message.event === "console output"){
                        console.log(removeTimestamps(message.args[0]));
                        // console.log('next Line')
                    }

                })
                await interaction.reply(`command executed sucessfull`)    


            // If user want information about the server 
            case "info":
                const {id} = await getter.getserverbyname(servername)
                const {attributes:serverInfo} = await getservers(id)
                // console.log(serverInfo);
                
                embed.setTitle(`${serverInfo.name}'s Info`)
                .setDescription(`${serverInfo.description} `)
                .addFields(
                    {name: `UUID`,value: `${serverInfo.uuid}`,inline: false},
                    {name: "ID",value: `${serverInfo.id}`,inline: true},
                    {name: `Identifier`, value: `${serverInfo.identifier}`,inline: true},
                    {name: `Status`, value: `${serverInfo.status}`,inline: true}
                ).addFields(
                    {name: "Memory",value: `${serverInfo.limits.memory}`,inline: true},
                    {name: "Swap",value: `${serverInfo.limits.swap}`,inline: true},
                    {name: "Disk",value: `${serverInfo.limits.disk}`,inline: true},
                    {name: "Io",value: `${serverInfo.limits.io}`,inline: true},
                    {name: "Cpu",value: `${serverInfo.limits.cpu}`,inline: true},
                    {name: "OOM_disabled",value: `${serverInfo.limits.oom_disabled}`,inline: true}
                ).addFields(
                    {name: `Databases`, value: `${serverInfo.feature_limits.databases}`,inline: true},
                    {name: `Allocations`, value: `${serverInfo.feature_limits.allocations}`,inline: true},
                    {name: `Backups`, value: `${serverInfo.feature_limits.backups}`,inline: true},
                )
                const actionRow = new ActionRowBuilder()
                actionRow.addComponents([serverStartButton,serverRestartButton,serverStopButton,serverKillButton])
                interaction.reply({ephemeral:true,embeds: [embed],components:[actionRow]})
        }
    }
}


