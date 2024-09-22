const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')




async function sendCommandToPterodactyl(serverId, command, apiKey) {
    try {
        const response = await axios.post(`https://panel.clubcolony.in/api/client/servers/${serverId}/command`, {
            command: command
    }, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
    });
  
        console.log(`Response is : ${response.data}`);
    } catch (error) {
        console.error('Error sending command:', error);
    }
}
  
// Replace with your actual server ID and API key
const serverId = '228b5e70-d891-4179-a0db-6fcfc66ff054';
const apiKey = 'ptlc_ytuuj0jdGuBx4iG8ypkpFWobX4IApIAUOUfWi7S5Krd';
const command = 'say Hello, world!';

sendCommandToPterodactyl(serverId, command, apiKey);