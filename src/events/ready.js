import { Events } from 'discord.js';
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
			const exsisitingServers = new Array
			servers.forEach(server => exsisitingServers.push(server.dataValues.uuid))
			response.forEach(element => {
				if(!exsisitingServers.includes(element.attributes.uuid)){
					setters.addServer(element.attributes.id,
						element.attributes.uuid,
						element.attributes.name,
						element.attributes.identifier)
					console.log(`added new server ${element.attributes.name}`);
				}
			});	
		} catch (error) {
			console.log('Some error occure while updating server list');
		}
		// await client.emit(Events.GuildMemberAdd, {client})
	},
};