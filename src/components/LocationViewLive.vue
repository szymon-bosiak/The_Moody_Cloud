<template>
    <div class="rounded-xl max-w-screen-lg mb-6 w-5/6 overflow-hidden"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">

        <!-- Preview mode -->
        <div v-if="route.query.preview" @click="addLocation"
            class="text-white pt-5 pb-4 px-8 bg-weather-primary rounded-xl -translate-y-1 flex justify-center items-center hover:text-amber-400 duration-150 cursor-pointer relative z-20">
            <p>
                Add this location to your tracking list
            </p>
            <i class="fa-solid fa-plus text-xl ml-2"></i>
        </div>

        <!-- Live weather -->
        <div class="flex flex-col items-center text-white pt-12 w-full">
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
                    class="relative z-10 text-big xs:text-huge font-SquadaOne h-[300px] xs:h-[500px] -translate-y-24 xs:-translate-y-20 drop-shadow-[0_3px_3px_rgba(0,0,0,0.55)]">
                    <p v-if="tempFormat">
                        {{ Math.round(weatherData.current.temp) }}
                    </p>
                    <p v-else>
                        {{ Math.round((weatherData.current.temp * 9 / 5) + 32) }}
                    </p>
                </div>

                <!-- Conditional IMGs -->
                <div>
                    <div v-if="weatherData.current.weather[0].icon === '01d'"
                        class="w-[1200px] absolute -bottom-72 -left-72 xs:-bottom-28 xs:-left-44 lg:left-2 xl:left-48">
                        <img class="w-full" src="../assets/icons/animated/day.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '01n'"
                        class="w-[800px] xs:w-[1000px] absolute -bottom-28 -right-56 xs:-bottom-10 xs:-right-80 lg:left-20 xl:left-72">
                        <img class="w-full" src="../assets/icons/animated/night.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '02d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-72 xs:-right-96 xl:-right-72"
                            src="../assets/icons/animated/cloudy-day-1.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-56 -translate-x-3 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-72"
                            src="../assets/icons/animated/cloudy-day-1.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '02n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-20 -right-64 xs:-bottom-20 xs:-right-80 xl:-right-64"
                            src="../assets/icons/animated/cloudy-night-1.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-44 -translate-x-3 xs:-left-64 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-56"
                            src="../assets/icons/animated/cloudy-night-1.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '03d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-72 xs:-right-96 xl:-right-72"
                            src="../assets/icons/animated/cloudy-day-2.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-56 -translate-x-3 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-72"
                            src="../assets/icons/animated/cloudy-day-2.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '03n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-20 -right-64 xs:-bottom-20 xs:-right-80 xl:-right-72"
                            src="../assets/icons/animated/cloudy-night-2.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-44 -translate-x-3 xs:-left-64 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-56"
                            src="../assets/icons/animated/cloudy-night-2.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '04d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-72 xs:-right-96 xl:-right-72"
                            src="../assets/icons/animated/cloudy-day-3.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-56 -translate-x-3 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-72"
                            src="../assets/icons/animated/cloudy-day-3.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '04n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-20 -right-64 xs:-bottom-20 xs:-right-80 xl:-right-72"
                            src="../assets/icons/animated/cloudy-night-3.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-44 -translate-x-3 xs:-left-64 lg:-left-96 lg:-translate-x-20 xl:lg:-translate-x-56"
                            src="../assets/icons/animated/cloudy-night-3.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '09d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-52 xs:-bottom-6 xs:-right-96 lg:-right-64 xl:-right-40"
                            src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                        <img class="w-full absolute -scale-x-100 -bottom-72 right-52 -translate-x-3 xs:right-52 lg:right-96 xl:right-96 xl: xl:-translate-x-32"
                            src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '09n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-52 xs:-bottom-6 xs:-right-96 lg:-right-64 xl:-right-40"
                            src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                        <img class="w-full absolute -scale-x-100 -bottom-72 right-52 -translate-x-3 xs:right-52 lg:right-96 xl:right-96 xl: xl:-translate-x-32"
                            src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                    </div>
               
                    <div v-else-if="weatherData.current.weather[0].icon === '10d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-72 xs:-right-96 xl:-right-80"
                            src="../assets/icons/animated/rainy-3.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-72 -left-56 -translate-x-3 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:-translate-x-72"
                            src="../assets/icons/animated/rainy-3.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '10n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-32 -right-52 xs:-bottom-8 xs:-right-96 lg:-right-64 xl:-right-40"
                            src="../assets/icons/animated/rainy-5.svg" alt="weather icon" />
                        <img class="w-full absolute -scale-x-100 -bottom-72 -left-52 -translate-x-3 xs:-left-52 lg:-left-96 xl:-translate-x-32"
                            src="../assets/icons/animated/rainy-5.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '11d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-20 -right-52 xs:bottom-0 xs:-right-80 lg:-right-64 xl:-right-40"
                        src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    <img class="w-full absolute -scale-x-100 -bottom-64 -left-52 -translate-x-3 xs:-left-52 lg:-left-80 xl:-left-96 xl:-translate-x-32"
                        src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '11n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-20 -right-52 xs:bottom-0 xs:-right-80 lg:-right-64 xl:-right-40"
                        src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    <img class="w-full absolute -scale-x-100 -bottom-64 -left-52 -translate-x-3 xs:-left-52 lg:-left-80 xl:-left-96 xl:-translate-x-32"
                        src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '13d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-28 -right-72 xs:-right-80"
                            src="../assets/icons/animated/snowy-3.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-56 -translate-x-2 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:-translate-x-72"
                            src="../assets/icons/animated/snowy-3.svg" alt="weather icon" />
                    </div>
                    <div v-else-if="weatherData.current.weather[0].icon === '13n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-28 -right-72 xs:-right-80 xl:-right-52"
                        src="../assets/icons/animated/snowy-5.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-80 -left-56 -translate-x-2 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:-translate-x-44"
                        src="../assets/icons/animated/snowy-5.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '50d'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-full absolute -bottom-28 -right-72 xs:-right-80 xl:-right-72" src="../assets/icons/animated/cloudy.svg"
                        alt="weather icon" />
                        <img class="w-full absolute -bottom-64 -left-56 -translate-x-2 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:-translate-x-52"
                        src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-full absolute -top-64 -right-40 xs:-top-96 xs:-right-44 -scale-x-100"
                        src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="weatherData.current.weather[0].icon === '50n'"
                        class="w-[800px] xs:w-[1000px] absolute bottom-0 -right-40">
                        <img class="w-[700px] absolute -bottom-20 right-48 xs:bottom-6 xs:right-72 lg:right-96 lg:bottom-14 xl:-translate-x-48"
                        src="../assets/icons/animated/night.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-28 -right-72 xs:-right-80 xl:-right-72"
                        src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-full absolute -bottom-64 -left-56 -translate-x-2 xs:-left-72 lg:-left-96 lg:-translate-x-20 xl:-translate-x-52"
                        src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                        <img class="w-full absolute -top-64 -right-40 xs:-top-96 xs:-right-44 -scale-x-100"
                        src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                    </div>
                </div>
            </div>

            <div class="w-full px-11 mt-8 flex flex-col drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                <div v-if="weatherData.alerts" class="flex flex-row items-center text-orange-400 pb-2 text-xl">
                    <i class="fa-solid fa-triangle-exclamation pr-4 xs:pr-2 text-3xl xs:text-xl"></i>
                    <p class="font-bold">{{ weatherData.alerts[0].event }}</p>
                </div>
                <div class="flex flex-col xs:flex-row">
                    <div class="pr-4">
                        <p v-if="tempFormat">
                            Feels like
                            {{ Math.round(weatherData.current.feels_like) }}&deg;
                        </p>
                        <p v-else>
                            Feels like
                            {{ Math.round((weatherData.current.feels_like * 9 / 5) + 32) }}&deg;
                        </p>
                    </div>
                    <p class="capitalize">
                        {{ weatherData.current.weather[0].description }}
                    </p>
                </div>
            </div>

            <div
                class="flex flex-col justify-center w-5/6 relative z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]  transition-all duration-500">
                <div @click="showDetails"
                    class="flex justify-center self-center mb-5 mt-4 transition-transform duration-300 place-self-center  "
                    :class="{ '-scale-y-100': detailsStatus }">
                    <i class="flex fa-solid fa-caret-down text-3xl cursor-pointer place-self-center "
                        style="color: #00668A;"></i>
                </div>

                <div class="max-h-0 transition-all duration-500" :class="{ 'max-h-96': detailsStatus }">
                    <div class="flex flex-row justify-between border-b border-amber-500 mb-2 p-2">
                        <p>Wind:</p>
                        <p>{{ weatherData.current.wind_speed }} km/h</p>
                    </div>

                    <div class="flex flex-row justify-between border-b border-amber-500 mb-2 p-2">
                        <p>Humidity:</p>
                        <p>{{ weatherData.current.humidity }} %</p>
                    </div>

                    <div class="flex flex-row justify-between border-b border-amber-500 mb-2 p-2">
                        <p>Pressure:</p>
                        <p>{{ weatherData.current.pressure }} hPa</p>
                    </div>

                    <div class="flex flex-row justify-between border-b border-amber-500 mb-8 p-2">
                        <p>UV index:</p>
                        <p>{{ (Math.round(weatherData.current.uvi) > 1) ? Math.round(weatherData.current.uvi) : 1 }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { uid } from 'uid';

defineProps({
    weatherData: {
        type: Object,
    },
    tempFormat: Boolean,
    timeOfDay: String,
})

const route = useRoute()
const router = useRouter()

const savedLocations = ref([])
const addLocation = () => {
    if (localStorage.getItem('savedLocations')) {
        savedLocations.value = JSON.parse(localStorage.getItem('savedLocations'))
    }

    const locationObj = {
        id: uid(),
        location: route.params.location,
        coordinates: {
            lat: route.query.lat,
            lng: route.query.lng,
        }
    }

    savedLocations.value.push(locationObj)
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value))

    let query = Object.assign({}, route.query)
    delete query.preview
    query.id = locationObj.id
    router.replace({ query })
}

const detailsStatus = ref(false)
const showDetails = () => {
    detailsStatus.value = !detailsStatus.value
}
</script>