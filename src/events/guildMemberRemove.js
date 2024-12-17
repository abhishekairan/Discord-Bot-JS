import { Channels } from '../config.json' assert { type: 'json' };

export default {
    name: "guildMemberRemove",
    once: false,
    async execute(member){
        const channel = member.guild.channels.cache.get(Channels.memberCount);
        // Update the channel name with the total member count
        channel.setName(`𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${member.guild.memberCount}`);
    }
}