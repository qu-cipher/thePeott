<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UsersIcon, QrCodeIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const squadName = ref('Alpha Squad')
const squadLevel = ref(1)
const memberCount = ref(1)
const inviteCode = ref('ALPHA123')

const navigateToSquad = () => {
  router.push('/squad')
}
</script>

<template>
  <div class="squad-section mx-auto max-w-sm" @click="navigateToSquad">
    <div class="glass-effect rounded-xl p-4 space-y-3 cursor-pointer transform transition hover:scale-[1.02]">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ squadName }}</h2>
        <span class="px-2 py-1 bg-primary-500/20 rounded-full text-xs font-medium text-primary-400">
          Level {{ squadLevel }}
        </span>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center gap-2 text-sm">
          <UsersIcon class="w-4 h-4 text-gray-400" />
          <span>{{ memberCount }}/10 Members</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <QrCodeIcon class="w-4 h-4 text-gray-400" />
          <span>{{ inviteCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>