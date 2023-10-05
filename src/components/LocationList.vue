<template>
    <draggable v-model="savedLocations" @change="updateList" group="savedLocations" itemKey="savedLocations.id"
        @start="drag = false" @end="drag = false" drag-class="drag" ghost-class="ghost">
        <template #item="{ element: location }">
            <LocationCard @click="goToLocationView(location)" :location="location" :tempFormat="tempFormat" class="mb-6"
                :key="location.id" />
        </template>
    </draggable>

    <p v-if="savedLocations.length === 0">
        Currently you are not tracking any location.
    </p>
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

const updateList = () => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value))
}

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