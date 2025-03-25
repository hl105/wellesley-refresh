// https://nuxt.com/docs/api/configuration/nuxt-config
require("dotenv").config();
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Wellesley Refresh",
      meta: [
        {
          name: "description",
          content: "Refreshing the Wellesley AVI Fresh Website",
        },
        { name: "apple-mobile-web-app-title", content: "Refresh" }
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
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
