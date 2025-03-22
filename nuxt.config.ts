// https://nuxt.com/docs/api/configuration/nuxt-config
require("dotenv").config();
import tailwindcss from "@tailwindcss/vite";



export default defineNuxtConfig({
  app: {
    head: {
      title: "Wellesley Refresh",
      meta: [
        { name: "description", content: "Refreshing the Wellesley AVI Fresh Website" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/scripts",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseKey: process.env.NUXT_SUPABASE_KEY,
    },
  },
  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirect: false,
  },
  css: ["~/assets/main.css"],
  googleFonts: {
    families: {
      DynaPuff: true,
      "Work Sans": true,
    },
  },
});
