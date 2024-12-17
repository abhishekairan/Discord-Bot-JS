import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

// Helper to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      // Path to the command file
      const commandPath = path.join(__dirname, `${command.data.name}.js`);

      // Convert the path to a file:// URL for the ESM loader
      const commandURL = pathToFileURL(commandPath).href;

      // Remove the old command from the collection
      interaction.client.commands.delete(command.data.name);

      // Dynamically import the new command
      const { default: newCommand } = await import(`${commandURL}?update=${Date.now()}`); // Cache-busting

      // Add the new command to the collection
      interaction.client.commands.set(newCommand.data.name, newCommand);

      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``
      );
    }
  },
};
