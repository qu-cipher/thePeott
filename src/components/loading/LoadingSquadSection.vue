<script setup lang="ts">
import LoadingShimmer from './LoadingShimmer.vue';
</script>

<template>
  <div class="squad-section mx-auto max-w-sm">
    <div class="glass-effect rounded-xl p-4 space-y-3">
      <div class="flex items-center justify-between">
        <LoadingShimmer width="8rem" height="1.5rem" rounded="md" />
        <LoadingShimmer width="4rem" height="1.5rem" rounded="full" />
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <LoadingShimmer height="1.25rem" rounded="md" />
        <LoadingShimmer height="1.25rem" rounded="md" />
      </div>
    </div>
  </div>
</template>