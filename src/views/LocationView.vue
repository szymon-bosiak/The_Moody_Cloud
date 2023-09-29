<template>
    <div>
        <Suspense>
            <AsyncLocationView :tempFormat="tempFormat"/>
            <template #fallback>
                <AsyncLocationViewSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncLocationView from '../components/AsyncLocationView.vue';
import AsyncLocationViewSkeleton from '../components/AsyncLocationViewSkeleton.vue';

defineProps({
    tempFormat: Boolean
})
</script>