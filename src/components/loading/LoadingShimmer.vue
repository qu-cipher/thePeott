<script setup lang="ts">
defineProps<{
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}>();
</script>

<template>
  <div 
    class="shimmer"
    :class="{
      'rounded-none': rounded === 'none',
      'rounded-sm': rounded === 'sm',
      'rounded': rounded === 'md',
      'rounded-lg': rounded === 'lg',
      'rounded-full': rounded === 'full'
    }"
    :style="{
      width: width || '100%',
      height: height || '1rem'
    }"
  />
</template>

<style scoped>
.shimmer {
  @apply bg-gray-700 relative overflow-hidden;
}

.shimmer::after {
  @apply absolute inset-0;
  content: '';
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>