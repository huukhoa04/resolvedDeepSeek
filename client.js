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
                setTimeout(() => reject(new Error('Request timed out after 10 minutes')), 600000)
            )
            ]);
            await interaction.editReply(`Query: \n\`${query}\`\nResponse: \n\`\`\`${response}\`\`\``);
        } catch (error) {
            await interaction.editReply(`Query: \n\`${query}\`\nError: \n\`\`\`${error.message}\`\`\``);
        }
    }
    if (interaction.commandName === 'code') {
        const query = interaction.options.getString('query');
        const language = interaction.options.getString('language');
        console.log(`Query: ${query}, Language: ${language}`);
        await interaction.deferReply();
        try {
            const response = await Promise.race([
              deepSeekAPI(`Using ${language}, ${query}`),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timed out after 10 minutes')), 600000)
              )
            ]);
            await interaction.editReply(`Query: \n\`${query}\`\nResponse: ${response}`);
          } catch (error) {
            await interaction.editReply(`Query: \n\`${query}\`\nError: \n\`\`\`${error.message}\`\`\``);
          }
    }
});

export const resolvedDeepSeek = client;