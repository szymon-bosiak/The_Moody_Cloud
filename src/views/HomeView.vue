<template>
  <main class="w-full flex flex-col justify-center text-white">
    <div class="flex justify-center">
      <div class="pt-4 mb-8 relative w-5/6 max-w-screen-2xl">
        <input type="text" v-model="searchQuery" @input="getSearchResults" @focus="toogleSearchResults"
          @blur="toogleSearchResults" placeholder="Enter location name"
          class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
        <ul class="absolute bg-weather-secondary text-white w-full shadow-xl py-2 px-1 top-[66px] z-30 rounded-md"
          v-if="searchResults && inputFocus">
          <p class="py-2 mx-2" v-if="searchError">There was an error performing your search.</p>
          <p class="py-2 mx-2" v-if="!searchError && searchResults.length === 0">
            No results has been found, try a different phrase.
          </p>
          <template v-else>
            <li v-for="searchResult in searchResults" @click="previewLocation(searchResult)" :key="searchResult.id"
              class="py-2 px-2 cursor-pointer border-b border-weather-primary border-opacity-80">
              <p class="hover:translate-x-2 transition-transform">{{ searchResult.place_name }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex flex-col gap-4 w-5/6 max-w-screen-2xl">
        <Suspense>
          <LocationList :tempFormat="tempFormat" />
          <template #fallback>
            <LocationCardSkeleton />
          </template>
        </Suspense>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import LocationList from "../components/LocationList.vue";
import LocationCardSkeleton from "../components/LocationCardSkeleton.vue";
import { API_KEY_GEO } from "../API";

defineProps({
  tempFormat: Boolean
})

const router = useRouter()
const previewLocation = (searchResult) => {
  const [location] = searchResult.place_name.split(',')
  router.push({
    name: 'locationView',
    params: { location: location },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    }
  })
}

const searchQuery = ref('')
const querryTimeout = ref(null)
const searchResults = ref(null)
const searchError = ref(null)
const inputFocus = ref(false)

const getSearchResults = () => {
  clearTimeout(querryTimeout.value)
  querryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${API_KEY_GEO}&types=place`
        );
        searchResults.value = result.data.features;
      } catch {
        searchError.value = true
      }

      return;
    }
    searchResults.value = null;
  }, 300)
}

const toogleSearchResults = () => {
  setTimeout(() => {
    inputFocus.value = !inputFocus.value
  }, 125);

}
</script>