import dotenv from 'dotenv';
dotenv.config();
export const config = {
  token: process.env.TOKEN,
  discordAppId: process.env.DISCORDAPPID,
  deepSeek: process.env.DEEPSEEKAPI
};