import axios from "axios";
import { config } from "../config.js";

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.deepSeek}`,
}
export const deepSeekAPI = async (query) => {
    try{
        if(query.length === 0 || query.length > 150){
            return 'Token length must be between 1 and 1000 characters.';
        }
        const messages = [
            {role: "system", content: "You are a helpful assistant."},
            {role: "user", content: query}
        ]
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                max_tokens: 700,
                model: 'deepseek-chat',
                messages: messages,
                stream: false,
                stop: ['\n']
            },
            {
                headers: headers,
            }
        );
        console.log('Response:', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error.message);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
}
export const codeGen = async (query, language) => {
    try{
        if(query.length === 0 || query.length > 150){
            return 'Token length must be between 1 and 1000 characters.';
        }
        const messages = [
            {role: "user", content: query},
            {role: "assistant", "content": `\`\`\`${language}`, "prefix": True}
        ]
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                max_tokens: 700,
                model: 'deepseek-code',
                messages: messages,
                stream: false,
                stop: ['```']
            },
            {
                headers: headers,
            }
        );
        console.log('Response:', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error.message);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
}
