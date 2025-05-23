import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandBooleanOption, EmbedBuilder } from 'discord.js';
import McServer from '../../utils/APICalls/minecraft.js';

export default {

    data: new SlashCommandBuilder()
    .setName("mcserver")
    .setDescription("Give info about mc server")
    .addStringOption(
        new SlashCommandStringOption()
        .setName("ip")
        .setDescription("IP of the server without port")
        .setRequired(true)
    )
    .addBooleanOption(
        new SlashCommandBooleanOption()
        .setName("bedrock")
        .setDescription("Is this server ip is of a Bedrock server?")
        .setRequired(false)
    ),
    async execute(interaction) {
        
        const serverIP = interaction.options.getString('ip') 
        const bedrock = interaction.options.getBoolean('bedrock')
        const serverData = await McServer(serverIP, bedrock)
        // console.log(serverData)
        // console.log(serverData.icon)

        // let embed = new EmbedBuilder().setTitle(`${serverIP} Stats`).setTimestamp()
        let embed = new EmbedBuilder().setAuthor({name: `${serverIP}`}).setTimestamp()

        if(serverData.online){
            embed.addFields(
                {name: "Status", value: "🟢 Online"},
                {name: "Players", value: `${serverData.players.online}/${serverData.players.max}`},
            )
        }else{
            embed.addFields(
                {name: "Status", value: "🔴 Online"}
            )
        }

        interaction.reply({embeds: [embed]})
    }
}