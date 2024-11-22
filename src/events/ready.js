import { Events } from 'discord.js';
import { Database } from '../database/models';
import getservers from '../pterodactyl-api/Application/getservers';
import getter from '../database/getter';
import setters from '../database/setters';


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		Database.sync()
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
				}
			});	
		} catch (error) {
			console.log('Some error occure while updating server list');
		}
	},
};