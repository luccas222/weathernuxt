<template>
  <div class="h-screen relative overflow-hidden bg-slate-500 justify-center items-center flex">
    <div
      class="absolute w-full h-full top-0 overlay bg-blend-overlay bg-slate-600 bg-opacity-70 z-[1]"
    />

    <div class="container max-w-screen-lg h-full flex justify-between items-center z-10">
      <div class="flex w-full justify-between items-start">
        <div class="col w-1/2">
          <h1 class="text-white text-6xl">{{ city?.name }}</h1>
          <p class="text-white text-xl font-thin opacity-50 mb-1">{{ today() }}</p>
          <img
            class="mt-[-40px] mb-[-50px] ml-[-20px] max-h-40"
            :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`"
            alt="weather icon"
          />

          <div class="flex mt-8">
            <input
              class="border rounded-l px-2 py-2 w-full"
              type="search"
              name="city"
              id=""
              placeholder="Busca una ciudad..."
              v-model="ciudad"
            />
            <button
              class="px-4 py-2 bg-cyan-800 text-white border-cyan-800 rounded-r hover:bg-cyan-950 active:bg-cyan-700"
              type="button"
              @click="buscarCiudad"
            >
              Buscar
            </button>
          </div>
          <div class="error" v-if="!city">No podemos encontrar esa ciudad</div>
        </div>
        <div class="col w-1/2">
          <h2 class="text-white text-6xl font-thin text-right mb-[3px]">
            {{ city?.main.temp }}&#8451; / {{ city?.main.humidity }}%
          </h2>
          <p class="text-white text-xl font-thin text-right opacity-50 mb-1">
            {{ city.weather[0].description }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <img
    :src="imageBackground.results[0].urls.full"
    alt=""
    class="absolute w-full top-0 overlay bg-blend-overlay bg-slate-600 bg-opacity-50 z-0"
  />
</template>

<script setup lang="ts">
// const config = useRuntimeConfig();
const cookie = useCookie("city", {
  default: () => "Bruselas",
  sameSite: true,
});

useHead({ title: "Weather" });

// interface citiInter {
//   name: string;
//   weather: number;
//   main: {
//     temp: number;
//     humidity: number;
//   };
// }
const search = ref(cookie);
const ciudad = ref();

// interface APIBody {
//   name: string;
//   weather: {};
//   main: {
//     temp: number;
//     humidity: number;
//   };
// }
let {
  data: imageBackground,
  pending,
  error,
  refresh,
} = await useJsonImageData(() => `?query=${search.value}`, {
  onRequestError({ request, options, error }) {
    console.log("request req:", request);
    console.log("request opt:", options);
    console.log("request err:", error);
  },
  onResponseError({ request, response, error }) {
    console.log("error req:", request);
    console.log("error resp:", response);
    console.log("error err:", error);
  },
});
let { data: city } = await useJsonWeatherData(() => `?q=${search.value}&lang=es&units=metric`, {
  onResponseError({ request, response, error }) {
    let theErr = response._data.statusCode;
    if (theErr != 200) {
      // console.log("response:", response._data.statusCode);
      search.value = "Toronto";
      // refresh();
    }
  },
});

// const change = watch(city, (newValue) => {
//   // console.log(newValue?.name);
//   if (newValue == null) search.value = "Canberra";
// });

// FORMATO DE LA FECHA
const today = function formatDate() {
  const date = new Date();
  const today = date.toLocaleString("es-MX", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });

  // Get year, month, and day part from the date
  const year = date.toLocaleString("es-MX", { year: "numeric" });
  const month = date.toLocaleString("es-MX", { month: "long" });
  const day = date.toLocaleString("es-MX", { day: "2-digit" });
  const hour = date.toLocaleString("es-MX", { hour: "numeric" });
  const mins = date.toLocaleString("es-MX", { minute: "numeric" });

  // return `${day} de ${month} de ${year} - ${hour}:${mins}`;
  return today;
};

// API CALLS PARA LA CIUDAD Y LUEGO PARA LA IMAGEN DE FONDO BASADO EN LA CIUDAD
const buscarCiudad = () => {
  const busquedaAjustada = ciudad.value.trim().split(" ").join("+");
  search.value = busquedaAjustada;
  ciudad.value = "";
};

// console.log(city);
</script>
