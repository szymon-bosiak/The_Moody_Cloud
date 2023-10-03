 rounded<template>
    <div class="flex py-6 px-3  bg-primary-green rounded-md shadow-md">
        <div class="flex flex-col flex-1 gap-2">
            <Placeholder class="max-w-[50%] rounded" />
            <Placeholder class="max-w-[40%] rounded" />
        </div>

        <div class="flex flex-col items-end flex-1 gap-2">
            <Placeholder class="max-w-[50px] w-full rounded" />
            <Placeholder class="max-w-[75px] w-full rounded" />
        </div>
    </div>
</template>

<script setup>
import Placeholder from "./Placeholder.vue";
</script>