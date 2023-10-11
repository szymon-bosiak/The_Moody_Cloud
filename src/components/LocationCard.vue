<template>
    <div class="mx-4 md:mx-16 flex justify-center">
    <div class=" w-full flex justify-center p-6 rounded-xl shadow-md cursor-pointer overflow-hidden transition hover:scale-105"
        :class="{ 'bg-night': (props.location.weather.weather[0].icon).slice(2) === 'n', 'bg-day': (props.location.weather.weather[0].icon).slice(2) === 'd' }">
        <div class="flex flex-col flex-1 relative pt-4">
            <h2 class="text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-20">{{ location.location }}</h2>
            <!-- BG animated IMG -->
            <div class="absolute  w-96 h-full -left-32 xs:-left-10 md:left-0">
                <img v-if="location.weather.weather[0].icon === '01d'" class="absolute z-10 w-96 h-96 -bottom-36 left-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/day.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '01n'" class="absolute  w-96 h-96 -bottom-40 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/night.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '02d'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-day-1.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '02n'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-night-1.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '03d'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-day-2.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '03n'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-night-2.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '04d'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-day-3.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '04n'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy-night-3.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '09d'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '09n'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '10d'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/rainy-3.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '10n'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/rainy-5.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '11d'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/thunder.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '11n'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/thunder.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '13d'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/snow-3.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '13n'" class="absolute  w-96 h-96 -bottom-28 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]"
                    src="../assets/icons/animated/snow-5.svg" alt="weather icon" />

                <img v-else-if="location.weather.weather[0].icon === '50d'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
                <img v-else-if="location.weather.weather[0].icon === '50n'" class="absolute  w-96 h-96 -bottom-44 left-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
            </div>
        </div>

        <div v-if="tempFormat" class="flex flex-col gap-2 font-SquadaOne relative z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            <p class="text-5xl self-end">
                {{ Math.round(location.weather.main.temp) }}&deg;
            </p>
            <div class="flex gap-3 text-xl">
                <span class="flex justify-between gap-2">
                    <i class="fa-solid fa-temperature-arrow-up text-lg" style="color: #e9481f;"></i>
                    <p class="w-6">{{ Math.round(location.weather.main.temp_max) }}&deg;</p>
                </span>
                <span class="flex justify-between gap-2">
                    <i class="fa-solid fa-temperature-arrow-down text-lg" style="color: #3fb9df;"></i>
                    <p class="w-6">{{ Math.round(location.weather.main.temp_min) }}&deg;</p>
                </span>
            </div>
        </div>

        <div v-else class="flex flex-col gap-2 font-SquadaOne relative z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            <p class="text-5xl self-end">
                {{ Math.round((location.weather.main.temp * 9 / 5) + 32) }}&deg;
            </p>
            <div class="flex gap-3 text-xl">
                <span class="flex justify-between gap-2">
                    <i class="fa-solid fa-temperature-arrow-up text-lg" style="color: #e9481f;"></i>
                    <p class="w-6">{{ Math.round((location.weather.main.temp_max * 9 / 5) + 32) }}&deg;</p>
                </span>
                <span class="flex justify-between gap-2">
                    <i class="fa-solid fa-temperature-arrow-down text-lg" style="color: #3fb9df;"></i>
                    <p class="w-6">{{ Math.round((location.weather.main.temp_min * 9 / 5) + 32) }}&deg;</p>
                </span>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
const props = defineProps({
    location: {
        type: Object,
        default: () => { },
    },
    tempFormat: Boolean,
})
</script>

<style scoped>
</style>