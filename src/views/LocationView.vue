<template>
    <div>
        <Suspense>
            <LocationView :tempFormat="tempFormat"/>
            <template #fallback>
                <LocationViewSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import LocationView from '../components/LocationView.vue';
import LocationViewSkeleton from '../components/LocationViewSkeleton.vue';

defineProps({
    tempFormat: Boolean
})
</script>