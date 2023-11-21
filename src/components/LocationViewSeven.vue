<template>
    <div class="max-w-screen-lg w-5/6 py-12 rounded-xl mb-6"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div class="mx-8 text-white">
            <h2 class="mb-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">7 Day Forecast</h2>
            <div v-for="day in weatherData.daily" :key="day.dt"
                class="flex items-center justify-between border-2 rounded-xl mb-5 px-6 shadow-lg h-28 overflow-hidden">
                <div
                    class="flex flex-col w-16 gap-2 realtive z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] xs:drop-shadow-none">
                    <p class="text-2xl">
                        {{
                            new Date(day.dt * 1000).toLocaleDateString(
                                "en-GB",
                                {
                                    weekday: "long",
                                }
                            )
                        }}
                    </p>
                    <p class="text-xs">
                        {{
                            new Date(day.dt).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "long",
                                }
                            )
                        }}
                    </p>
                </div>

                <!-- Conditional IMGs -->
                <div class="flex justify-center items-center relative z-10">

                    <!-- Backdrop -->
                    <div class="relative">
                        <div class="w-96 h-40 rounded-full blur-3xl absolute -left-28 -top-10"
                            :class="{ 'bg-weather-secondary bg-opacity-10': timeOfDay === 'n', 'bg-blue-300 bg-opacity-30': timeOfDay === 'd' }">
                        </div>
                    </div>

                    <div v-if="day.weather[0].icon === '01d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/day.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '01n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/night.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '02d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-day-1.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '02n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-night-1.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '03d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-day-2.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '03n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-night-2.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '04d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-day-3.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '04n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy-night-3.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '09d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/rainy-6.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '09n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/rainy-6.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '10d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/rainy-3.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '10n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/rainy-5.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '11d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/thunder.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '11n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/thunder.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '13d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/snowy-3.svg" alt="weather icon" />
                    </div>


                    <div v-else-if="day.weather[0].icon === '13n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/snowy-5.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '50d'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy.svg" alt="weather icon" />
                    </div>

                    <div v-else-if="day.weather[0].icon === '50n'"
                        class="absolute -top-20  -left-20 w-40 h-40 z-10 opacity-50 xs:opacity-100">
                        <img class="w-full h-full " src="../assets/icons/static/cloudy.svg" alt="weather icon" />
                    </div>
                </div>

                <div class="text-xl relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] xs:drop-shadow-none">
                    <div v-if="tempFormat" class="flex flex-col gap-2 flex-1 justify-end">
                        <div class="flex flex-row gap-2">
                            <i class="fa-solid fa-temperature-arrow-up translate-y-[3px]" style="color: #e9481f;"></i>
                            <p>{{ Math.round(day.temp.max) }}&deg</p>
                        </div>
                        <div class="flex flex-row gap-2">
                            <i class="fa-solid fa-temperature-arrow-down translate-y-[5px]" style="color: #3fb9df;"></i>
                            <p>{{ Math.round(day.temp.min) }}&deg</p>
                        </div>
                    </div>
                    <div v-else class="flex flex-col gap-2 flex-1 justify-end">
                        <div class="flex flex-row gap-2">
                            <i class="fa-solid fa-temperature-arrow-up translate-y-[3px]" style="color: #e9481f;"></i>
                            <p>{{ Math.round((day.temp.max * 9 / 5) + 32) }}&deg</p>
                        </div>
                        <div class="flex flex-row gap-2">
                            <i class="fa-solid fa-temperature-arrow-down translate-y-[5px]" style="color: #3fb9df;"></i>
                            <p>{{ Math.round((day.temp.min * 9 / 5) + 32) }}&deg</p>
                        </div>
                    </div>
                </div>
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

</script>