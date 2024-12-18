<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
    image: string;
  };
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'buy', itemId: string): void;
}>();

const inventoryStatus = computed(() => {
  if (props.item.inventory <= 0) return 'Out of Stock';
  if (props.item.inventory < 10) return `Only ${props.item.inventory} left`;
  return `${props.item.inventory} available`;
});
</script>

<template>
  <div 
    class="shop-item"
    :class="{ 'pointer-events-none': loading }"
  >
    <div v-if="loading" class="animate-pulse">
      <div class="h-40 bg-gray-700 rounded-lg mb-4"></div>
      <div class="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-700 rounded w-full mb-4"></div>
      <div class="h-10 bg-gray-700 rounded"></div>
    </div>
    <template v-else>
      <div class="item-image">
        <img 
          :src="item.image" 
          :alt="item.name"
          loading="lazy"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-description">{{ item.description }}</p>
      <div class="item-details">
        <span class="item-price">{{ item.price.toLocaleString() }} 🪙</span>
        <span class="item-inventory" :class="{ 'text-red-500': item.inventory <= 0 }">
          {{ inventoryStatus }}
        </span>
      </div>
      <button 
        class="buy-button"
        :disabled="item.inventory <= 0"
        @click="emit('buy', item.id)"
      >
        {{ item.inventory <= 0 ? 'Out of Stock' : 'Buy Now' }}
      </button>
    </template>
  </div>
</template>

<style scoped>
.shop-item {
  @apply bg-gray-800/50 rounded-xl p-4 transition-transform hover:scale-[1.02];
}

.item-image {
  @apply w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-700;
}

.item-name {
  @apply text-lg font-semibold mb-1 truncate;
}

.item-description {
  @apply text-sm text-gray-400 mb-4 line-clamp-2;
}

.item-details {
  @apply flex justify-between items-center mb-4 text-sm;
}

.item-price {
  @apply font-medium text-primary-400;
}

.item-inventory {
  @apply text-gray-500;
}

.buy-button {
  @apply w-full py-2 px-4 rounded-lg font-medium transition-colors
    bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-600 
    disabled:cursor-not-allowed disabled:opacity-50;
}
</style>