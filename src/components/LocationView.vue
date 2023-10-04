<template>
  <div class="flex justify-center items-center py-6">
    <div class="w-5/6 flex flex-1 flex-col items-center">

      <!-- Main display -->
      <LocationViewLive :weatherData="weatherData" :tempFormat="tempFormat" :timeOfDay="timeOfDay"/>

      <!-- 24 Hours Forecast -->
      <LocationViewTwentyfour :weatherData="weatherData" :tempFormat="tempFormat" :timeOfDay="timeOfDay"/>

      <!-- 7 Day Forecast -->
      <LocationViewSeven :weatherData="weatherData" :tempFormat="tempFormat" :timeOfDay="timeOfDay"/>

      <!-- Remove City -->
      <div class="rounded-xl max-w-screen-lg w-5/6"
        :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div v-if="!route.query.preview" @click="removeLocation"
          class="flex items-center justify-center gap-2 py-5 text-white cursor-pointer duration-150 rounded-xl hover:text-black hover:bg-red-800">
          <i class="fa-solid fa-trash -translate-y-[1px]"></i>
          <p>Stop tracking this location</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { uid } from 'uid';
import { useRoute, useRouter } from 'vue-router';
import { API_KEY_WEATHER } from '../API';
import LocationViewLive from './LocationViewLive.vue';
import LocationViewTwentyfour from './LocationViewTwentyfour.vue';
import LocationViewSeven from './LocationViewSeven.vue';

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

const timeOfDay = (weatherData.current.weather[0].icon).slice(2)

</script>
