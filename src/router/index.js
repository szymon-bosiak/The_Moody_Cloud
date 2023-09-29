import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocationView from '../views/LocationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      },
    },
    {
      path: '/:location/',
      name: 'locationView',
      component: LocationView,
      meta: {
        title: 'Tracked Locations'
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `Weather App | ${to.params.location ? to.params.location : to.meta.title }`
  next()
})

export default router
