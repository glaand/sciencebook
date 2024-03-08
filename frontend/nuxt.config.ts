// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/supabase', 
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-lodash',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      "storeToRefs", // import { storeToRefs } from 'pinia'
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['QuillEditor'].includes(tag),
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      openApiKey: process.env.OPENAI_API_KEY
    }
  },
})
