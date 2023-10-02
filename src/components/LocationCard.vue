<template>
    <div class="flex p-6 rounded-xl shadow-md cursor-pointer" :class="{ 'bg-night': timeOfDay === 'n', 'bg-day': timeOfDay === 'd' }">
        <div class="flex flex-col flex-1">
            <h2 class="text-4xl">{{ location.location }}</h2>
        </div>

        <div v-if="tempFormat" class="flex flex-col gap-2 font-SquadaOne">
            <p class="text-5xl self-end">
                {{ Math.round(location.weather.main.temp) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-sm">
                    H:
                    {{ Math.round(location.weather.main.temp_max) }}&deg;
                </span>
                <span class="text-sm">
                    L:
                    {{ Math.round(location.weather.main.temp_min) }}&deg;
                </span>
            </div>
        </div>

        <div v-else class="flex flex-col gap-2 font-SquadaOne">
            <p class="text-5xl self-end">
                {{ Math.round((location.weather.main.temp * 9 / 5) + 32) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-sm">
                    H:
                    {{ Math.round((location.weather.main.temp_max * 9 / 5) + 32) }}&deg;
                </span>
                <span class="text-sm">
                    L:
                    {{ Math.round((location.weather.main.temp_min * 9 / 5) + 32) }}&deg;
                </span>
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

const timeOfDay = (props.location.weather.weather[0].icon).slice(2)
</script>