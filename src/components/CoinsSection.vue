<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CurrencyDollarIcon, GiftIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'

const primaryCoins = ref(123456789)
const secondaryCoins = ref(1234)

const router = useRouter();

const openSettings = () => {
  router.push('/settings')
}
</script>

<template>
  <div class="fixed top-10 left-1/2 -translate-x-1/2 z-50">
    <div class="glass-effect rounded-full px-3 py-1.5 flex gap-3 shadow-lg scale-90">
      <div class="flex items-center gap-1">
        <CurrencyDollarIcon class="w-3.5 h-3.5 text-primary-400" />
        <span class="text-xs font-medium">{{ primaryCoins.toLocaleString() }}</span>
      </div>
      <div class="flex items-center gap-1">
        <GiftIcon class="w-3.5 h-3.5 text-purple-400" />
        <span class="text-xs font-medium">{{ secondaryCoins.toLocaleString() }}</span>
      </div>
      <button 
        @click="openSettings"
        class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
      >
        <Cog6ToothIcon class="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.glass-effect {
  margin-top: env(safe-area-inset-top);
}
</style>