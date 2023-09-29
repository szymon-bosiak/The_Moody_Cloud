<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ location.location }}</h2>
        </div>

        <div v-if="tempFormat" class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(location.weather.main.temp) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    H:
                    {{ Math.round(location.weather.main.temp_max) }}&deg;
                </span>
                <span class="text-xs">
                    L:
                    {{ Math.round(location.weather.main.temp_min) }}&deg;
                </span>
            </div>
        </div>

        <div v-else class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round((location.weather.main.temp * 9 / 5) + 32) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    H:
                    {{ Math.round((location.weather.main.temp_max * 9 / 5) + 32) }}&deg;
                </span>
                <span class="text-xs">
                    L:
                    {{ Math.round((location.weather.main.temp_min * 9 / 5) + 32) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    location: {
        type: Object,
        default: () => { },
    },
    tempFormat: Boolean,
})

</script>