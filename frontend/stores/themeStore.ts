export const useThemeStore = defineStore('themeStore', () => {
    const theme = ref(localStorage.getItem('daisyui-theme') || 'dark');
    const themes = ref([
        'light',
        'dark',
        'cupcake',
        'bumblebee',
        'emerald',
        'corporate',
        'synthwave',
        'retro',
        'cyberpunk',
        'valentine',
        'halloween',
        'garden',
        'forest',
        'aqua',
        'lofi',
        'pastel',
        'fantasy',
        'wireframe',
        'black',
        'luxury',
        'dracula',
        'cmyk',
        'autumn',
        'business',
        'acid',
        'lemonade',
        'night',
        'coffee',
        'winter',
    ]);

    // subscribe to theme changes
    watch(theme, (value: string) => {
        localStorage.setItem('daisyui-theme', value);
    });

    return {
        theme,
        themes
    }
})