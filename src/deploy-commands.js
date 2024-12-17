import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const fileUrl = `file://${filePath.replace(/\\/g, '/')}`; // Convert to valid file URL
		const command = await import(fileUrl); // Use file URL for dynamic import
		if ('data' in command.default && 'execute' in command.default) {
			commands.push(command.default.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// Function to delete all global slash command
async function delete_all_global_command(){
    try {
        console.log('Started deleting all global commands...');

        // Fetch all global commands
        const commands = await rest.get(Routes.applicationCommands(process.env.CLIENTID));

        // Loop through and delete each command
        for (const command of commands) {
            await rest.delete(Routes.applicationCommand(process.env.CLIENTID, command.id));
            console.log(`Deleted global command: ${command.name}`);
        }

        console.log('Successfully deleted all global commands.');
    } catch (error) {
        console.error('Error deleting global commands:', error);
    }
};

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();