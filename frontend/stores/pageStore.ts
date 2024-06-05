import OpenAI from "openai";

export const usePageStore = defineStore('pageStore', () => {
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const config = useRuntimeConfig()
    const openai = new OpenAI({
        apiKey: config.public.openApiKey,
        dangerouslyAllowBrowser: true
    });

    const currentPage = ref(null);
    const pages = ref([]);

    const setCurrentPage = async (page) => {
        const { data, error } = await client
            .from('pages')
            .select('*')
            .eq('id', page.id)
            .single();
        if (error) {
            console.error('Error loading page', error);
        } else {
            currentPage.value = data;
        }
    };
    const fetchPages = async () => {
        const { data, error } = await client
            .from('pages')
            .select('id,title')
            .eq('user_id', user.value.id)
            .order('id', { ascending: true });
        if (error) {
            console.error('Error loading pages', error);
        } else {
            pages.value = data;
            if (pages.value.length > 0 && currentPage.value === null) {
                setCurrentPage(pages.value[pages.value.length - 1]);
            }
        }
    }
    const updatePage = async () => {
        const { data, error } = await client
            .from('pages')
            .update({
                title: currentPage.value.title,
                content: currentPage.value.content
            })
            .eq('id', currentPage.value.id);
        if (error) {
            console.error('Error updating page', error);
        } else {
            await fetchPages();
        }
    }

    const newPage = async () => {
        const { data, error } = await client
            .from('pages')
            .insert({ title: 'New Page', content: '', user_id: user.value.id });
        if (error) {
            console.error('Error creating page', error);
        } else {
            await fetchPages();
            setCurrentPage(pages.value[pages.value.length - 1]);
        }
    }

    const deletePage = async (page) => {
        const { data, error } = await client
            .from('pages')
            .delete()
            .eq('id', page.id);
        if (error) {
            console.error('Error deleting page', error);
        } else {
            await fetchPages();
            if (pages.value.length > 0) {
                setCurrentPage(pages.value[pages.value.length - 1]);
            } else {
                currentPage.value = null;

            }
        }
    }

    function stripHtml(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    const getAllWords = async () => {
        const words = [];
        const { data, error } = await client
            .from('pages')
            .select('content')
            .eq('user_id', user.value.id)
            .order('id', { ascending: true });
        if (error) {
            console.error('Error loading pages', error);
        } else {
            for (let i = 0; i < data.length; i++) {
                let content = stripHtml(data[i].content);
                console.log(content);
                words.push(content.split(' '));
            }
        }
        // count each word in words and create a list of words with their count
        let wordCount = {};
        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words[i].length; j++) {
                let word = words[i][j].toLowerCase();
                if (wordCount[word] === undefined) {
                    wordCount[word] = 1;
                } else {
                    wordCount[word]++;
                }
            }
        }
        let sortable = [];
        for (let word in wordCount) {
            sortable.push([word, wordCount[word]]);
        }
        return sortable;
    }

    const getTimeline = async () => {
        const timeline = [];
        const { data, error } = await client
            .from('pages')
            .select('title,content,created_at')
            .eq('user_id', user.value.id)
            .order('id', { ascending: true });
        if (error) {
            console.error('Error loading pages', error);
        } else {
            for (let i = 0; i < data.length; i++) {
                let botMessage = "";
                const strippedContent = stripHtml(data[i].content);

                if (strippedContent.length < 200) {
                    continue;
                }
               
                const stream = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Please summarise the following text maximum 100 words. start with your note is about..."},
                        { role: "user", content: strippedContent.substring(0,10000) }
                    ],
                    stream: true,
                });
                
                for await (const chunk of stream) {
                    // add content of chunk to botMessage
                    botMessage += chunk.choices[0]?.delta?.content || "";
                }

                timeline.push({
                    createdAt: data[i].created_at,
                    title: data[i].title,
                    content: botMessage,
                    position: i % 2 === 0 ? 'start' : 'end'
                });
            }
        }
        return timeline;
    }

    return {
        currentPage,
        pages,
        setCurrentPage,
        fetchPages,
        updatePage,
        newPage,
        deletePage,
        getAllWords,
        getTimeline
    }
});
