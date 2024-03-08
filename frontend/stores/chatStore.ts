import OpenAI from "openai";

class Message {
    sender: string;
    message: string;
    loading: boolean;
    constructor(sender: string, message: string, loading: boolean) {
        this.sender = sender;
        this.message = message;
        this.loading = loading;
    }
}

export const useChatStore = defineStore('chatStore', () => {
    const config = useRuntimeConfig()
    const openai = new OpenAI({
        apiKey: config.public.openApiKey,
        dangerouslyAllowBrowser: true
    });

    const chats = ref<Message[]>([]);
    const addMessage = (message: Message) => {
        chats.value.push(message);
    }
    const deleteLastMessage = () => {
        chats.value.pop();
    }
    const clearMessages = () => {
        chats.value = [];
    }
    const sendMessage = async (message) => {
        addMessage({ sender: "You", message });
        addMessage({ sender: "C.A.R.L", loading: true });
    
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an AI research assistant."},
                ...chats.value.filter((chat) => chat.sender === "You")
                              .map((chat) => ({ role: "user", content: chat.message })),
                { role: "user", content: message }
            ],
            stream: true,
        });
        let botMessage = "";
        for await (const chunk of stream) {
            // add content of chunk to botMessage
            botMessage += chunk.choices[0]?.delta?.content || "";
        }
    
        deleteLastMessage();
        addMessage({ sender: "C.A.R.L", message: botMessage });
    }    
    return {
        chats,
        addMessage,
        deleteLastMessage,
        clearMessages,
        sendMessage
    }
});