<template>
    <div class="flex flex-col flex-1">

        <div class="flex flex-col py-12 items-center">
            <Placeholder class="max-w-[300px] w-full mb-2 rounded-md" />
            <Placeholder class="max-w-[300px] w-full mb-12 rounded-md" />
            <Placeholder class="max-w-[300px] h-[100px] w-full mb-12 rounded-md" />
            <Placeholder class="max-w-[300px] w-full mb-8 rounded-md" />
            <Placeholder class="max-w-[300px] h-[75px] w-full rounded-md" />
        </div>

        <div class="flex flex-col py-12 px-8 items-center">
            <Placeholder class="max-w-screen-md h-[100px] w-full mb-12  rounded-lg" />
        </div>

        <div class="flex flex-col py-12 px-8 items-center">
            <Placeholder class="max-w-screen-md h-[100px] w-full mb-12 rounded-lg" />
        </div>
    </div>
</template>

<script setup>
import Placeholder from "./Placeholder.vue";
</script>