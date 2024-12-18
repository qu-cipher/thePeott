<script setup lang="ts">
import LoadingShimmer from './LoadingShimmer.vue';
</script>

<template>
  <div class="engine-section mx-auto max-w-sm">
    <div class="glass-effect rounded-xl overflow-hidden">
      <div class="aspect-video bg-gray-800/50">
        <LoadingShimmer height="100%" />
      </div>
      
      <div class="p-4 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div v-for="n in 4" :key="n" class="flex items-center gap-2">
            <LoadingShimmer width="100%" height="2rem" rounded="md" />
          </div>
        </div>

        <div class="flex gap-3">
          <LoadingShimmer height="2.5rem" rounded="lg" />
          <LoadingShimmer height="2.5rem" rounded="lg" />
        </div>
      </div>
    </div>
  </div>
</template>