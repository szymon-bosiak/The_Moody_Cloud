<template>
    <div class="rounded-xl max-w-screen-lg mb-6 w-5/6"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">

        <!-- Preview mode -->
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-primary text-center rounded-xl -translate-y-1 ">
            <p>
                You are currently previewing this location, click the "+"
                icon to pin this it onto home screen.
            </p>
            <i @click="addLocation" v-if="route.query.preview"
                class="fa-solid fa-plus text-2xl hover:text-amber-500 duration-150 cursor-pointer"></i>
        </div>

        <!-- Live weather -->
        <div class="flex flex-col items-center text-white py-12 w-full overflow-hidden">
            <div class="w-full relative z-10 px-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                <h1 class="text-5xl mb-2">{{ route.params.location }}</h1>
                <p class="text-sm mb-12">
                    {{
                        new Date(weatherData.currentTime).toLocaleDateString(
                            "en-GB",
                            {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            }
                        )
                    }}
                    -
                    {{
                        new Date(weatherData.currentTime).toLocaleTimeString([], {
                            hour: "2-digit", minute: "2-digit"
                        })
                    }}
                </p>
            </div>

            <div class="relative flex flex-row justify-center w-full">
                <div
                    class="relative z-10 text-huge font-SquadaOne h-[500px] -translate-y-20 drop-shadow-[0_3px_3px_rgba(0,0,0,0.55)]">
                    <p v-if="tempFormat">
                        {{ Math.round(weatherData.current.temp) }}
                    </p>
                    <p v-else>
                        {{ Math.round((weatherData.current.temp * 9 / 5) + 32) }}
                    </p>
                </div>

                <!-- Conditional IMGs -->
                <div>
                    <div v-if="weatherData.current.weather[0].icon === '01d'">
                        <img class="w-[700px] absolute -top-72 -right-40" src="../assets/icons/animated/day.svg"
                            alt="weather icon" />
                    </div>
                    <div v-if="weatherData.current.weather[0].icon === '01n'">
                        <img class="w-[600px] absolute -top-64 -right-32" src="../assets/icons/animated/night.svg"
                            alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '02d'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/cloudy-day-1.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-44 -left-80" src="../assets/icons/animated/cloudy-day-1.svg"
                            alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '02n'">
                        <img class="w-[600px] absolute -top-56 -right-64" src="../assets/icons/animated/cloudy-night-1.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-40 -left-72"
                            src="../assets/icons/animated/cloudy-night-1.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '03d'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/cloudy-day-2.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-44 -left-80" src="../assets/icons/animated/cloudy-day-2.svg"
                            alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '03n'">
                        <img class="w-[600px] absolute -top-56 -right-64" src="../assets/icons/animated/cloudy-night-2.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-40 -left-72"
                            src="../assets/icons/animated/cloudy-night-2.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '04d'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/cloudy-day-3.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-44 -left-80" src="../assets/icons/animated/cloudy-day-3.svg"
                            alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '04n'">
                        <img class="w-[600px] absolute -top-56 -right-64" src="../assets/icons/animated/cloudy-night-3.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-40 -left-72"
                            src="../assets/icons/animated/cloudy-night-3.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '09d'">
                        <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/rainy-6.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-32 -left-40" src="../assets/icons/animated/rainy-6.svg"
                            alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '09n'">
                        <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/rainy-6.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-36 -left-48 -scale-x-100"
                            src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '10d'">
                        <img class="w-[600px] absolute -top-56 -right-64" src="../assets/icons/animated/rainy-3.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-40 -left-72 -translate-x-2"
                            src="../assets/icons/animated/rainy-3.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '10n'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/rainy-5.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-36 -left-48" src="../assets/icons/animated/rainy-5.svg"
                            alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '11d'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/thunder.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-20 -left-40 -scale-x-100"
                            src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '11n'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/thunder.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-20 -left-40 -scale-x-100"
                            src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '13d'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/snowy-3.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-32 -left-72" src="../assets/icons/animated/snowy-3.svg"
                            alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '13n'">
                        <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/snowy-5.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-32 -left-60" src="../assets/icons/animated/snowy-5.svg"
                            alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '50d'">
                        <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/cloudy.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-64 -right-36 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '50n'">
                        <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/cloudy.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-64 -right-36 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '50n'">
                        <img class="w-[600px] absolute bottom-12 -left-52" src="../assets/icons/animated/night.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/cloudy.svg"
                            alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-[600px] absolute -bottom-64 -right-36 -scale-x-100"
                            src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                    </div>
                </div>
            </div>

            <div class="w-full px-11 mt-8 flex flex-row drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                <div class="pr-4 ">
                    <p v-if="tempFormat">
                        Feels like
                        {{ Math.round(weatherData.current.feels_like) }}&deg;
                    </p>
                    <p v-else>
                        Feels like
                        {{ Math.round((weatherData.current.feels_like * 9 / 5) + 32) }}&deg;
                    </p>
                </div>
                <p class="capitalize ">
                    {{ weatherData.current.weather[0].description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    weatherData: {
        type: Object,
    },
    tempFormat: Boolean,
    timeOfDay: String,
})

import { useRoute } from 'vue-router';
const route = useRoute()
</script>