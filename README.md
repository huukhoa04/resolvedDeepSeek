# ResolvedDeepSeek Discord Bot

A Discord bot that integrates with the DeepSeek AI API to provide intelligent responses to user queries.

## Features

- Slash command support
- Integration with DeepSeek AI API
- Simple example command functionality
- Configurable through environment variables

## Requirements

- Node.js
- Discord Bot Token
- DeepSeek API Key
- Discord Application ID

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
DEEPSEEKAPI=your_deepseek_api_key
DISCORDAPPID=your_discord_app_id
TOKEN=your_discord_bot_token
```

## Usage

1. Register slash commands:
```bash
npm run register
```

2. Start the bot:
```bash
npm start
```

## Available Commands

- `/deepseek` - Query the DeepSeek AI API
    - Required parameter: `query` (string)

- `/examplerds` - Example command
    - Required parameters: 
        - `input` (string)
        - `choice` (integer: 1 or 2)

## Configuration

The bot is configured using environment variables in the `.env` file:
- `TOKEN`: Discord bot token
- `DISCORDAPPID`: Discord application ID
- `DEEPSEEKAPI`: DeepSeek API key

## License

ISC