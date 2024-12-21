<script setup lang="ts">
import { ref, computed } from 'vue'
import { FireIcon, BeakerIcon, WrenchIcon, BoltIcon } from '@heroicons/vue/24/outline'

const miningRate = ref(1.5)
const minedCoins = ref(100)
const gasUsage = ref(0.5)
const gasLeft = ref(80)
const isRunning = ref(false)

const toggleEngine = () => {
  isRunning.value = !isRunning.value
}

const boltIconColor = computed(() => (isRunning.value ? 'text-gold-400 w-24 h-24' : 'text-gray-600 w-16 h-16'))
const animateText = computed(() => (isRunning.value ? "text-emeral-400 animate-blink" : "text-red-400"))
</script>

<template>
  <div class="engine-section mx-auto max-w-sm">
    <div class="glass-effect rounded-xl overflow-hidden">
      <div class="engine-canvas relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
        <BoltIcon 
          class="transition-all duration-1000 ease-in-out"
          :class="boltIconColor"
        />
        <p class="text-white mt-2 text-sm" :class="animateText">{{ isRunning ? "Mining..." : "Stopped" }}</p>
      </div>
      
      <div class="p-4 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-2 text-sm">
            <FireIcon class="w-6 h-6 text-orange-400" />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Mining Rate</span>
              <span class="font-medium">{{ miningRate }}/s</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <BeakerIcon class="w-6 h-6 text-green-400" />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Mined</span>
              <span class="font-medium">{{ minedCoins }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <WrenchIcon class="w-6 h-6 text-blue-400" />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Gas Usage</span>
              <span class="font-medium">{{ gasUsage }}/s</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-primary-500 h-2 rounded-full" :style="{ width: `${gasLeft}%` }"></div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition">
            Claim
          </button>
          <button 
            @click="toggleEngine" 
            class="flex-1 px-4 py-2 rounded-lg font-medium transition"
            :class="isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'"
          >
            {{ isRunning ? 'Stop' : 'Start' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
}

.animate-blink {
  animation: blink 3s infinite;
}

.text-gold-400 {
  color: #ffd700;
}
</style>
