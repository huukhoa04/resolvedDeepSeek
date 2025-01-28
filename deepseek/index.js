import axios from "axios";
import { config } from "../config.js";

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const BETA_URL = 'https://api.deepseek.com/beta/chat/completions';
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.deepSeek}`,
}
let messages = [
    {role: "system", content: "You are a helpful assistant."},
]
export const deepSeekAPI = async (query) => {
    try{
        if(query.length === 0 || query.length > 150){
            return 'Token length must be between 1 and 1000 characters.';
        }
        messages.push({role: "user", content: query});
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                max_tokens: 512,
                model: 'deepseek-chat',
                messages: messages,
                stream: false,
                // stop: ['']
            },
            {
                headers: headers,
            }
        );
        let content = response.data.choices[0].message.content;
        if(content.length > 1900){
            content = content.slice(0, 1900);
        }
        console.log('Response:', content);
        messages.push({role: "assistant", content: content});
        return content;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error.message);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
}
export const chatReset = () => {
    messages = [
        {role: "system", content: "You are a helpful assistant."},
    ]
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
            BETA_URL,
            {
                max_tokens: 716,
                model: 'deepseek-code',
                messages: messages,
                stream: false,
                // stop: ['']
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
