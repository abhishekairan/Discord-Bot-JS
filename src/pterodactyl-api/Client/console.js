import axios from 'axios';
import configs from '../../config.json' assert { type: 'json' };
const { panel } = configs

const ClientKey = panel.CLIENTKEY
const ClientURL = panel.ClientURL

async function sendCommandToPterodactyl(serverId, command) {
    try {
        const response = await axios.post(`${ClientURL}/servers/${serverId}/command`, {
            command: command
    }, {
        headers: {
          Authorization: `Bearer ${ClientKey}`
        }
    });
        // console.log(`Response is : ${response.data}`);
        return response.data;
    } catch (error) {
        console.error('Error sending command:', error);
    }
}
  
// Replace with your actual server ID and API key



export default async (serverId, command) => {
    const response = await sendCommandToPterodactyl(serverId, command)
    return response
}