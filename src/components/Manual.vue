<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="manualActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-50">
                <Transition name="modal-inner">
                    <div v-if="manualActive" class=" bg-white self-start mt-40 max-w-screen-md rounded-lg p-10">
                        <div class="w-full flex justify-end">
                            <button @click="$emit('closeManual')" class="text-white bg-weather-transparent flex justify-end mb-2">
                                    <i class="fa-solid fa-xmark text-amber-500 text-3xl"></i>
                            </button>
                        </div>
                        <slot />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineEmits(['closeManual'])
defineProps({
    manualActive: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>