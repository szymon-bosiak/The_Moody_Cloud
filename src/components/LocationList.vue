<template>
    <!-- <LocationCard v-for="location in savedLocations" :key="location.id" :location="location" :tempFormat="tempFormat" @click="goToLocationView(location)" /> -->
    <draggable v-model="savedLocations" group="savedLocations" @start="drag = true" @end="drag = false">
        <template #item="{ element }">
            <LocationCard :location="element" :tempFormat="tempFormat" @click="goToLocationView(location)" class="mb-6"
                :key="element.id" />
        </template>
    </draggable>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { loadRouteLocation, useRouter } from "vue-router";
import draggable from 'vuedraggable'
import LocationCard from "./LocationCard.vue";
import { API_KEY_WEATHER } from '../API';

defineProps({
    tempFormat: Boolean
})

const savedLocations = ref([])
const getLocations = async () => {
    if (localStorage.getItem('savedLocations')) {
        savedLocations.value = JSON.parse(localStorage.getItem('savedLocations'))
    }

    const requests = [];
    savedLocations.value.forEach((location) => {
        requests.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${API_KEY_WEATHER}&units=metric`))
    })

    const weatherData = await Promise.all(requests)

    // Delay for animation
    await new Promise((res) => setTimeout(res, 300))

    weatherData.forEach((value, index) => {
        savedLocations.value[index].weather = value.data
    })
}
await getLocations()

const router = useRouter()
const goToLocationView = (location) => {
    router.push({
        name: "locationView",
        params: { location: location.location },
        query: {
            id: location.id,
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
        }
    })
}
</script>