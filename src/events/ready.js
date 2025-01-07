import { Events, resolvePartialEmoji } from 'discord.js';
import { Database } from '../database/models.js';
import getservers from '../pterodactyl-api/Application/getservers.js';
import getter from '../database/getter.js';
import setters from '../database/setters.js';


export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		Database.sync()
		console.log(`database is synced`);
		try {
			const response = await getservers()
			const servers = await getter.getservers()
			// console.log(...servers);
			const responseObjet = response.map((e)=>{return e.attributes})
			// console.log(responseObjet);
			console.log("Response: ",response);
			const exsisitingServers = new Array
			servers.forEach(server => exsisitingServers.push(server.dataValues))
			// console.log('object :>> ', servers);
			console.log("exsisiting Server: ",exsisitingServers);
			await syncServers(response,exsisitingServers)
		} catch (error) {
			console.log('Some error occure while updating server list');
		}
		// await client.emit(Events.GuildMemberAdd, {client})
	},
};

// Iterate through the response array and compare with existing servers
function syncServers(response, existingServers) {
    const existingMap = new Map(existingServers.map(server => [server.uuid, server]));

    response.forEach(item => {
        const attr = item.attributes;
        const existing = existingMap.get(attr.uuid);

        // Check if server exists
        if (existing) {
            // Check if any key attributes have changed
            if (existing.name !== attr.name || existing.identifier !== attr.identifier) {
				try{
					setters.updateServer(attr.id, attr.uuid, attr.name, attr.identifier);
					console.log(`Updated server: ${attr.uuid}`);
				}catch{
					console.log(`Error updating ${attr.uuid}`);
				}
            }
        } else {
            // New server, add it to the database
            console.log(`Adding new server: ${attr.uuid}`);
			try{
				setters.addServer(attr.id, attr.uuid, attr.name, attr.identifier);
			}catch{
				console.log(`Error Adding ${attr.uuid}`);
			}
        }
    });
}
