// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-api-party"],
  apiParty: {
    endpoints: {
      jsonImage: {
        url: process.env.NUXT_IMAGE_API_BASE_URL!,
        // Global headers sent with each request
        headers: {
          Authorization: `Client-ID ${process.env.NUXT_IMAGE_API_TOKEN}`,
        },
      },
      jsonWeather: {
        url: process.env.NUXT_WEATHER_API_BASE_URL!,
        // Global headers sent with each request
        query: {
          appid: `${process.env.NUXT_WEATHER_API_TOKEN}`,
        },
        headers: {
          // Authorization: `${process.env.NUXT_WEATHER_API_TOKEN}`,
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

// runtimeConfig: {
// public: {
//   weatherKey: "",
//   imageKey: "",
// },
// },

// axios: {
//   prefix: "/api/",
//   proxy: true,
// },
// proxy_image: {
//   "/api": {
//     target: "https://api.unsplash.com/search/photos",
//     pathRewrite: { "^/api/": "" },
//     headers: { "X-API-KEY": process.env.imageKey },
//     logLevel: "debug",
//   },
// },
// proxy_weather: {
//   "/api": {
//     target: "https://api.openweathermap.org/data/2.5/weather",
//     pathRewrite: { "^/api/": "" },
//     headers: { "X-API-KEY": process.env.weatherKey },
//     logLevel: "debug",
//   },
// },
