<template>
    <div class="flex justify-center">
        <header class="sticky top-0 bg-weather-primary shadow-lg rounded-xl w-5/6 flex justify-center items-center mt-6">
            <nav class="w-full px-11 flex flex-row items-center gap-4 text-white py-6">
                <RouterLink :to="{ name: 'home' }">
                    <div class="flex items-center gap-3">
                        <img class="w-32 h-16" src="../assets/logo_name.svg" alt="logo">
                    </div>
                </RouterLink>

                <div class="flex gap-3 flex-1 justify-end">
                    <i @click="toggleManual"
                        class="fa-solid fa-gear text-2xl hover:text-amber-500 duration-150 cursor-pointer"></i>
                </div>

                <Manual :manualActive="manualActive" @close-manual="toggleManual">
                    <div class="text-black">
                        <div class="flex gap-8 items-center mb-4">
                            <h1 class="text-2xl mb-1">Temperature scale preference:</h1>
                            <div @click="toggleTemp(); $emit('tempFormat')"
                                class="flex items-center bg-gray-300 rounded-full w-14 h-8 p-1 cursor-pointer">
                                <div class="h-6 w-6 rounded-full shadow-md bg-white transition text-sm flex items-center justify-center"
                                    :class="{ 'translate-x-6': !tempFormat }">
                                    <p class="text-black" v-if="tempFormat">°C</p>
                                    <p class="text-black transform" v-else="tempFormat === 'imperial'">°F</p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h2 class="text-2xl">How it works:</h2>
                            <ol class="list-decimal list-inside">
                                <li>
                                    Search for your city by entering the name into the
                                    search bar.
                                </li>
                                <li>
                                    Select a city within the results, this will take
                                    you to the current weather for your selection.
                                </li>
                                <li>
                                    Track the city by clicking on the "+" icon in the
                                    top right. This will save the city to view at a
                                    later time on the home page.
                                </li>
                            </ol>
                        </div>
                        <div class="mb-4">
                            <h2 class="text-2xl">Removing a city:</h2>
                            <p>
                                If you no longer wish to track a city, simply select
                                the city within the home page. At the bottom of the
                                page, there will be am option to delete the city.
                            </p>
                        </div>
                    </div>
                </Manual>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from "vue-router";
import Manual from './Manual.vue';

const manualActive = ref(null)
const toggleManual = () => {
    manualActive.value = !manualActive.value
}

const savedTempFormat = JSON.parse(localStorage.tempFormat)
const tempFormat = ref(savedTempFormat)
const toggleTemp = () => {
    tempFormat.value = !tempFormat.value
    localStorage.setItem('tempFormat', tempFormat.value)
}

</script>
