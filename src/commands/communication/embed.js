const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {roles} = require('../../config.json')

module.exports= {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Create a embed")
        .addStringOption(option => option
            .setName("description")
            .setDescription("The description of the embed")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("title")
            .setDescription("The title of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("image")
            .setDescription("The image of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("color")
            .setDescription("The color of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("author")
            .setDescription("The author of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("url")
            .setDescription("The url of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("thumbnail")
            .setDescription("The thumbnail of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("footer")
            .setDescription("The footer of the embed")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("footer-image")
            .setDescription("The footer-image of the embed")
            .setRequired(false)
        )
        .addChannelOption(option => option
            .setName("channel")
            .setDescription("The channel to send the embed")
            .setRequired(false)
        ),
        

    async execute(interaction){
        
        if(!interaction.member.roles.cache.has(roles.team)) return

        const channel = interaction.options.getChannel("channel")
        const title = interaction.options.getString("title")
        const description = interaction.options.getString("description")
        const image = interaction.options.getString("image")
        const color = interaction.options.getString("color")
        const author = interaction.options.getString("author")
        const url = interaction.options.getString("url")
        const thumbnail = interaction.options.getString("thumbnail")
        const footer = interaction.options.getString("footer")
        const footerImage = interaction.options.getString("footer-image")

        if(channel && (channel.type !== "GUILD_TEXT")) return interaction.reply({ content: "The channel must be a text channel.", ephemeral: true })

        try {
            const embed = new EmbedBuilder().setDescription(description)
            if(title) embed.setTitle(title)
            if(color) embed.setColor(color)
            if(image) embed.setImage(image)
            if(author) embed.setAuthor(author)
            if(url) embed.setURL(url)
            if(thumbnail) embed.setThumbnail(thumbnail)
            if(footer){
                if(footerImage){
                    embed.setFooter({ text: footer, iconURL: footerImage })
                }else{
                    embed.setFooter({ text: footer })
                }
            }
            interaction.reply({ content: "Done!", ephemeral: true })
            if(channel) {
                channel.send({
                    embeds: [embed]
                })
            } else {
                interaction.channel.send({
                    embeds: [embed]
                })
            }
        } catch(e) {
            interaction.reply("An error has occurred while sending the embed.")
        }
    }
}
