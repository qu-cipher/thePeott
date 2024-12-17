<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeIcon, ShoppingBagIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const isSquadPage = computed(() => route.path === '/squad')

const navItems = [
  { path: '/', icon: HomeIcon, label: 'Home' },
  { path: '/mates', icon: UserGroupIcon, label: 'Mates' },
  { path: '/earn', icon: CurrencyDollarIcon, label: 'Earn' },
  { path: '/shop', icon: ShoppingBagIcon, label: 'Shop' },
]
</script>

<template>
  <nav v-if="!isSquadPage" class="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 px-6 py-2">
    <div class="max-w-sm mx-auto flex justify-between">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path" 
        class="flex flex-col items-center p-2 transition"
        :class="route.path === item.path ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700'"
      >
        <component :is="item.icon" class="w-6 h-6" />
        <span class="text-xs mt-1">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>