const { Events } = require('discord.js')
const { Channels } = require('../config.json')

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member){
        const channel = member.guild.channels.cache.get(Channels.memberCount);
        // Update the channel name with the total member count
        channel.setName(`𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${member.guild.memberCount}`);
    }
}