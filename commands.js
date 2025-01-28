import { ApplicationCommandOptionType, REST, Routes } from 'discord.js';
import { config } from "./config.js";

/**
 * @typedef {Object} CommandChoice
 * @property {string} name - The display name of the choice
 * @property {number} value - The value associated with the choice
 */

/**
 * @typedef {Object} CommandOption
 * @property {string} name - The name of the option
 * @property {string} description - Description of what the option does
 * @property {ApplicationCommandOptionType} type - The type of the option (String, Integer, etc.)
 * @property {boolean} required - Whether the option is required
 * @property {CommandChoice[]} [choices] - Array of choices for the option if applicable
 */

/**
 * @typedef {Object} Command
 * @property {string} name - The name of the slash command
 * @property {string} description - Description of what the command does
 * @property {CommandOption[]} options - Array of options for the command
 */

/**
 * Array of command configurations for Discord bot slash commands.
 * Includes 'examplerds' command with text input and choice options,
 * and 'deepseek' command for querying the DeepSeek API.
 * 
 * @type {Command[]}
 */
const commands = [
    {
        name: 'examplerds',
        description: 'A simple slash command example',
        options: [
            {
                name: 'input',
                description: 'Enter some text',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'choice',
                description: 'Select an option',
                type: ApplicationCommandOptionType.Integer,
                required: true,
                choices: [
                    {
                        name: 'Option 1',
                        value: 1
                    },
                    {
                        name: 'Option 2',
                        value: 2
                    }
                ]
            }
        ]
    },
    {
        name: 'deepseek',
        description: 'Query the DeepSeek API',
        options: [
            {
                name: 'query',
                description: 'Enter a query',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'code',
        description: 'Generate code using the DeepSeek API',
        options: [
            {
                name: 'language',
                description: 'Select a language',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Python',
                        value: 'py'
                    },
                    {
                        name: 'JavaScript',
                        value: 'js'
                    },
                    {
                        name: 'Java',
                        value: 'java'
                    },
                    {
                        name: 'C++',
                        value: 'cpp'
                    },
                    {
                        name: 'C#',
                        value: 'csharp'
                    }
                ]
            },
            {
                name: 'query',
                description: 'Enter a query',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'chatreset',
        description: 'Reset the chat session with DeepSeek',
        options: []
    }
];

const rest = new REST({ version: '10' }).setToken(config.token);

export async function registerCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(config.discordAppId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

await registerCommands();