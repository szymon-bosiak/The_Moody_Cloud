<template>
    <div class="max-w-screen-lg w-5/6 pb-10 pt-8 rounded-xl mb-6 "
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div class="mx-6 text-white">
            <h2 class="mb-10 mx-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">24 Hours Forecast</h2>
            <div
                class="flex gap-8 overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-500 scrollbar-thumb-rounded-lg scrollbar-rounded-lg scrollbar-track-transparent">
                <div v-for="hourData in weatherData.hourly.slice(1, 25)" :key="hourData.dt"
                    class="flex flex-col gap-4 items-center w-40 mb-8">
                    <p class="whitespace-nowrap flex justify-center text-md w-32">
                        {{
                            new Date(
                                hourData.currentTime
                            ).toLocaleTimeString([], {
                                hour: "2-digit", minute: "2-digit"
                            })
                        }}
                    </p>

                    <!-- Conditional IMGs -->
                    <div>
                        <img v-if="hourData.weather[0].icon === '01d'" class="w-32" src="../assets/icons/static/day.svg"
                            alt="weather icon -translate-y-3" />
                        <img v-else-if="hourData.weather[0].icon === '01n'" class="w-32 -translate-y-3"
                            src="../assets/icons/static/night.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '02d'" class="w-32"
                            src="../assets/icons/static/cloudy-day-1.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '02n'" class="w-32"
                            src="../assets/icons/static/cloudy-night-1.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '03d'" class="w-32"
                            src="../assets/icons/static/cloudy-day-2.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '03n'" class="w-32"
                            src="../assets/icons/static/cloudy-night-2.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '04d'" class="w-32"
                            src="../assets/icons/static/cloudy-day-3.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '04n'" class="w-32"
                            src="../assets/icons/static/cloudy-night-3.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '09d' || '09n'" class="w-32"
                            src="../assets/icons/static/rainy-6.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '09n'" class="w-32"
                            src="../assets/icons/static/rainy-6.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '10d' || '09n'" class="w-32"
                            src="../assets/icons/static/rainy-3.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '10n'" class="w-32"
                            src="../assets/icons/static/rainy-5.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '11d' || '09n'" class="w-32"
                            src="../assets/icons/static/thunder.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '11n'" class="w-32"
                            src="../assets/icons/static/thunder.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '13d' || '09n'" class="w-32"
                            src="../assets/icons/static/snowy-3.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '13n'" class="w-32"
                            src="../assets/icons/static/snowy-5.svg" alt="weather icon" />

                        <img v-else-if="hourData.weather[0].icon === '50d' || '09n'" class="w-32"
                            src="../assets/icons/static/cloudy.svg" alt="weather icon" />
                        <img v-else-if="hourData.weather[0].icon === '50n'" class="w-32"
                            src="../assets/icons/static/cloudy.svg" alt="weather icon" />
                    </div>

                    <div class="text-4xl font-SquadaOne">
                        <p v-if="tempFormat">
                            {{ Math.round(hourData.temp) }}&deg;
                        </p>
                        <p v-else>
                            {{ Math.round((hourData.temp * 9 / 5) + 32) }}&deg;
                        </p>
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