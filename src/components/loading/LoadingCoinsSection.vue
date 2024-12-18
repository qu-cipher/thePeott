<script setup lang="ts">
import { useViewportPosition } from '../../composables/useViewportPosition';
import LoadingShimmer from './LoadingShimmer.vue';

const { topOffset } = useViewportPosition(5);
</script>

<template>
  <div 
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :style="{ top: `${topOffset}px` }"
  >
    <div class="glass-effect rounded-full px-3 py-1.5 flex gap-3 shadow-lg scale-90">
      <div class="flex items-center gap-1">
        <LoadingShimmer width="4rem" height="1rem" rounded="full" />
      </div>
      <div class="flex items-center gap-1">
        <LoadingShimmer width="3rem" height="1rem" rounded="full" />
      </div>
      <LoadingShimmer width="1.75rem" height="1.75rem" rounded="full" />
    </div>
  </div>
</template>