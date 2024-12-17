import { SlashCommandBuilder, REST, Routes } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

// Helper to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = process.cwd();

export default {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('The command to reload.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    try {
      // Function to find the command file path
      const findCommandPath = (name) => {
        const foldersPath = path.join(__dirname, 'src/commands'); // Adjust the path as needed
        const commandPath = path.join(foldersPath, `${name}.js`);

        // Check if the command file exists directly
        if (fs.existsSync(commandPath)) {
          return commandPath;
        }

        // If not found, search in subdirectories
        const subdirs = fs.readdirSync(foldersPath, { withFileTypes: true });
        for (const subdir of subdirs) {
          if (subdir.isDirectory()) {
            const subCommandPath = path.join(foldersPath, subdir.name, `${name}.js`);
            if (fs.existsSync(subCommandPath)) {
              return subCommandPath;
            }
          }
        }

        return null; // Command not found
      };

      // Find the command file path
      const commandPath = findCommandPath(command.data.name);

      if (!commandPath) {
        return interaction.reply(`Could not find the command file for \`${commandName}\`!`);
      }

      // Convert the path to a file:// URL for the ESM loader
      const commandURL = pathToFileURL(commandPath).href;

      // Remove the old command from the collection
      interaction.client.commands.delete(command.data.name);

      // Dynamically import the new command
      const { default: newCommand } = await import(`${commandURL}?update=${Date.now()}`); // Cache-busting

      // Add the new command to the collection
      interaction.client.commands.set(newCommand.data.name, newCommand);

      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);

	  const rest = new REST().setToken(process.env.TOKEN);
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
			{ body: [command.data.toJSON()] },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``
      );
    }
  },
};