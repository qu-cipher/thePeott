<script setup lang="ts">
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <div 
    class="grid gap-4 mx-auto max-w-7xl"
    :class="{ 'opacity-50': loading }"
    style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));"
  >
    <slot />
  </div>
</template>