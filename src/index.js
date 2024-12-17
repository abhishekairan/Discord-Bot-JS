import fs from 'node:fs';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Database } from './database/models.js';
import getservers from './pterodactyl-api/Application/getservers.js';
import getter from './database/getter.js';
import setters from './database/setters.js';

dotenv.config(); // Load environment variables

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Dynamically import commands
for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const fileUrl = `file://${filePath.replace(/\\/g, '/')}`; // Convert to valid file URL
		const command = await import(fileUrl); // Use file URL for dynamic import
		if ('data' in command.default && 'execute' in command.default) {
			client.commands.set(command.default.data.name, command.default);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Event listener: Client ready
client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
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
});

// Event listener: Interaction creation
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Log in to Discord with your app's token
client.login(process.env.TOKEN);
