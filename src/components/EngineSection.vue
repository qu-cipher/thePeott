<script setup lang="ts">
import { ref } from 'vue'
import { FireIcon, BeakerIcon, WrenchIcon } from '@heroicons/vue/24/outline'
import Engine from './Engine.vue'

const miningRate = ref(1.5)
const minedCoins = ref(100)
const gasUsage = ref(0.5)
const gasLeft = ref(80)
const isRunning = ref(false)

const toggleEngine = () => {
  isRunning.value = !isRunning.value
}

const claim = () => {
  // Claim logic will be implemented here
}
</script>

<template>
  <div class="engine-section mx-auto max-w-sm">
    <div class="glass-effect rounded-xl overflow-hidden">
      <div class="engine-canvas relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
         <Engine />
      </div>
      
      <div class="p-4 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-2 text-sm">
            <FireIcon class="w-4 h-4 text-orange-400" />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Mining Rate</span>
              <span class="font-medium">{{ miningRate }}/s</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <BeakerIcon class="w-4 h-4 text-green-400" />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Mined</span>
              <span class="font-medium">{{ minedCoins }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <WrenchIcon class="w-4 h-4 text-blue-400" />
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
          <button @click="claim" class="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition">
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