<template>
  <div class="flex justify-center items-center py-6">
    <div class="w-5/6">

      <!-- Main display -->
      <div class="rounded-xl max-w-screen-lg mb-6"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <!-- Preview mode -->
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-primary text-center rounded-xl -translate-y-1 ">
          <p>
            You are currently previewing this city, click the "+"
            icon to start tracking this city.
          </p>
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
                <img class="w-[600px] absolute -bottom-40 -left-72" src="../assets/icons/animated/cloudy-night-1.svg"
                  alt="weather icon" />
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
                <img class="w-[600px] absolute -bottom-40 -left-72" src="../assets/icons/animated/cloudy-night-2.svg"
                  alt="weather icon" />
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
                <img class="w-[600px] absolute -bottom-40 -left-72" src="../assets/icons/animated/cloudy-night-3.svg"
                  alt="weather icon" />
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
                <img class="w-[600px] absolute -bottom-32 -left-40 -scale-x-100"
                  src="../assets/icons/animated/rainy-6.svg" alt="weather icon" />
              </div>

              <div v-else-if="weatherData.current.weather[0].icon === '10d'">
                <img class="w-[600px] absolute -top-56 -right-64" src="../assets/icons/animated/rainy-3.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-40 -left-72 -translate-x-2" src="../assets/icons/animated/rainy-3.svg"
                  alt="weather icon" />
              </div>
              <div v-else-if="weatherData.current.weather[0].icon === '10n'">
                <img class="w-[600px] absolute -top-56 -right-48" src="../assets/icons/animated/rainy-5.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-44 -left-80" src="../assets/icons/animated/rainy-5.svg"
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
                <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100" src="../assets/icons/animated/cloudy.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-64 -right-36 -scale-x-100"
                  src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
              </div>
              <div v-else-if="weatherData.current.weather[0].icon === '50n'">
                <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/cloudy.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100" src="../assets/icons/animated/cloudy.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-64 -right-36 -scale-x-100"
                  src="../assets/icons/animated/cloudy.svg" alt="weather icon" />
              </div>

              <div v-else-if="weatherData.current.weather[0].icon === '50n'">
                <img class="w-[600px] absolute bottom-12 -left-52" src="../assets/icons/animated/night.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -top-64 -right-36" src="../assets/icons/animated/cloudy.svg"
                  alt="weather icon" />
                <img class="w-[600px] absolute -bottom-62 -left-52 -scale-x-100" src="../assets/icons/animated/cloudy.svg"
                  alt="weather icon" />
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

      <!-- 24 Hours Forecast -->
      <div class="max-w-screen-lg w-full pb-10 pt-8 rounded-xl mb-6 "
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div class="mx-6 text-white">
          <h2 class="mb-10 mx-5  drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">24 Hours Forecast</h2>
          <div class="flex gap-8 overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-500 scrollbar-thumb-rounded-lg scrollbar-rounded-lg scrollbar-track-transparent">
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
                <img v-if="hourData.weather[0].icon === '01d'" class="w-32"
                  src="../assets/icons/static/day.svg" alt="weather icon -translate-y-3" />
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
                  src="../assets/icons/static/snow-3.svg" alt="weather icon" />
                <img v-else-if="hourData.weather[0].icon === '13n'" class="w-32"
                  src="../assets/icons/static/snow-5.svg" alt="weather icon" />

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

      <!-- 7 Day Forecast -->
      <div class="max-w-screen-lg w-full py-12 rounded-xl mb-6"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div class="mx-8 text-white">
          <h2 class="mb-10">7 Day Forecast</h2>
          <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                  }
                )
              }}
            </p>

            <!-- Conditional IMGs -->
            <div class="">
              <img v-if="day.weather[0].icon === '01d'" class="w-[150px] h-auto" src="../assets/icons/static/day.svg"
                alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '01n'" class="w-[150px] h-auto"
                src="../assets/icons/static/night.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '02d'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-day-1.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '02n'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-night-1.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '03d'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-day-2.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '03n'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-night-2.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '04d'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-day-3.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '04n'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy-night-3.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '09d' || '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/rainy-6.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/rainy-6.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '10d' || '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/rainy-3.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '10n'" class="w-[150px] h-auto"
                src="../assets/icons/static/rainy-5.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '11d' || '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/thunder.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '11n'" class="w-[150px] h-auto"
                src="../assets/icons/static/thunder.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '13d' || '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/snow-3.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '13n'" class="w-[150px] h-auto"
                src="../assets/icons/static/snow-5.svg" alt="weather icon" />

              <img v-else-if="day.weather[0].icon === '50d' || '09n'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy.svg" alt="weather icon" />
              <img v-else-if="day.weather[0].icon === '50n'" class="w-[150px] h-auto"
                src="../assets/icons/static/cloudy.svg" alt="weather icon" />
            </div>

            <div v-if="tempFormat" class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}&deg</p>
              <p>L: {{ Math.round(day.temp.min) }}&deg</p>
            </div>
            <div v-else class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round((day.temp.max * 9 / 5) + 32) }}&deg</p>
              <p>L: {{ Math.round((day.temp.min * 9 / 5) + 32) }}&deg</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Remove City -->
      <div class="rounded-xl max-w-screen-lg" :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div v-if="!route.query.preview" @click="removeLocation"
          class="flex items-center justify-center gap-2 py-5 text-white cursor-pointer duration-150 rounded-xl hover:text-black hover:bg-red-800">
          <i class="fa-solid fa-trash"></i>
          <p>Remove City</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { API_KEY_WEATHER } from '../API';

defineProps({
  tempFormat: Boolean
})

const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${API_KEY_WEATHER}&units=metric`
    );

    // calculate current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset

    // calculate hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset
    });

    // Delay for animation
    await new Promise((res) => setTimeout(res, 300))

    return weatherData.data
  } catch (err) {
    console.log('error')
  }
}
const weatherData = await getWeatherData()

const router = useRouter()
const removeLocation = () => {
  const locations = JSON.parse(localStorage.getItem('savedLocations'))
  const updatedLocations = locations.filter((location) => location.id !== route.query.id)
  localStorage.setItem('savedLocations', JSON.stringify(updatedLocations))
  router.push({
    name: 'home'
  })
}

const timeOfDay = (weatherData.current.weather[0].icon).slice(2)
</script>
