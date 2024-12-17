import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Squad from '../views/Squad.vue'
import Earn from '../views/Earn.vue'
import Shop from '../views/Shop.vue'
import Mates from '../views/Mates.vue'
import Settings from '../views/Settings.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/squad',
      name: 'squad',
      component: Squad
    },
    {
      path: '/earn',
      name: 'earn',
      component: Earn
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/mates',
      name: 'mates',
      component: Mates
    }, {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router;