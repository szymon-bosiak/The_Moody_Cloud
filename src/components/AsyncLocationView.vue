<template>
  <div class="flex flex-col flex-1 items-center">

    <!-- Preview mode -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+"
        icon to start tracking this city.
      </p>
    </div>

    <!-- Live weather -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.location }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <div>
        <p v-if="tempFormat" class="text-8xl mb-8">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <p v-else class="text-8xl mb-8">
          {{ Math.round((weatherData.current.temp * 9 / 5) + 32) }}&deg;
        </p>
      </div>
      <div>
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
      <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        " alt="" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- 24 Hours Forecast -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">24 Hours Forecast</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hourData in weatherData.hourly.slice(1, 25)" :key="hourData.dt"
            class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString([], {
                  hour: "2-digit", minute: "2-digit"
                })
              }}
            </p>
            <img class="w-auto h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
                " alt="" />
            <p v-if="tempFormat" class="text-xl">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
            <p v-else class="text-xl">
              {{ Math.round((hourData.temp * 9 / 5) + 32) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- 7 Day Forecast -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
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
          <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              " alt="" />
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

    <div>
      <div v-if="!route.query.preview" @click="removeLocation"
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500">
        <i class="fa-solid fa-trash"></i>
        <p>Remove City</p>
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

</script>
