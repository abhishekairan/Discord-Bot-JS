import { Events } from 'discord.js';
import configs from '../config.json' assert { type: 'json' };
const { Channels } = configs

export default {
    name: Events.GuildMemberRemove,
    once: false,
    async execute(member){
        console.log("Member is removed");
        const channel = member.guild.channels.cache.get(Channels.memberCount);
        // Update the channel name with the total member count
        channel.setName(`𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${member.guild.memberCount}`);
    }
}