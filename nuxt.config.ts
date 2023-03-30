// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,

    injectPosition: "first",
    viewer: true,
  },
  runtimeConfig: {
    private: {
      weatherKey: "f14225ebd8e6cc58be64228d815bbbeb",
      imageKey: "9aN24BXnv-LqHHUiWV3IG8UcUWDopgVqOjKUn8LT1lU",
    },
  },
});
