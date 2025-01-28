import { Client, Events, GatewayIntentBits } from 'discord.js';
import { deepSeekAPI } from './deepseek/index.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'examplerds') {
      const input = interaction.options.getString('input');
      const choice = interaction.options.getInteger('choice');
      await interaction.reply(`You entered: ${input} and selected: ${choice}`);
    }
    if (interaction.commandName === 'deepseek') {
        const query = interaction.options.getString('query');
        console.log(`Query: ${query}`);
        await interaction.deferReply();
        try {
            const response = await Promise.race([
            deepSeekAPI(query),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timed out after 10 minutes')), 120000)
            )
            ]);
            await interaction.editReply(`\`${query}\`\n${response}`);
        } catch (error) {
            // Only send error message if interaction hasn't been responded to
          if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: 'There was an error processing your command.',
                ephemeral: true
            });
          }
        }
    }
});

export const resolvedDeepSeek = client;