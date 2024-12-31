import fs from 'node:fs';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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


// Event register
const eventsPath = join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const fileUrl = `file://${filePath.replace(/\\/g, '/')}`; // Convert to valid file URL
	const event = await import(fileUrl);
	if (event.default.once) {
		client.once(event.default.name, (...args) => event.default.execute(...args));
		// console.log(`${event.default.name} Registered`);
	} else {
		client.on(event.default.name, (...args) => event.default.execute(...args));
		// console.log(`${event.default.name} Registered`);
	}
}

// Log in to Discord with your app's token
client.login(process.env.TOKEN);
