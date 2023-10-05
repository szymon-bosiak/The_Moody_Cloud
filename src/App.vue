<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-background">
    <Navigation @temp-format="ToggleTemp" />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :tempFormat="tempFormat"/>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';



if (localStorage.getItem('tempFormat') == null) {
  localStorage.tempFormat = JSON.parse(true)
}

const savedTempFormat = JSON.parse(localStorage.tempFormat)
const tempFormat = ref(savedTempFormat)
const ToggleTemp = () => {
  tempFormat.value = !tempFormat.value
}

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 150ms ease all;
}

.page-enter-from,
.page-enter-to {
  opacity: 0;
}
</style>
