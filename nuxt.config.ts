// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-api-party"],

  runtimeConfig: {
    apiParty: {
      endpoints: {
        jsonImage: {
          url: ""!,
          // Global headers sent with each request
          headers: {
            Authorization: "",
          },
        },
        jsonWeather: {
          url: "",
          // Global headers sent with each request
          query: {
            appid: "",
          },
        },
      },
    },
  },
  // This is Tailwind module
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,

    injectPosition: "first",
    viewer: true,
  },
});
