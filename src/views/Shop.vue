<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import ShopLayout from '../components/shop/ShopLayout.vue';
import ShopGrid from '../components/shop/ShopGrid.vue';
import ShopItem from '../components/shop/ShopItem.vue';
import { useShopItems } from '../composables/useShopItems';

const { 
  items, 
  loading, 
  loadMore, 
  hasMore, 
  loadingMore,
  filterByCategory 
} = useShopItems();

const categories = ['All', 'Engines', 'Upgrades', 'Boosters', 'Cosmetics'];
const activeCategory = ref('All');

const filteredItems = computed(() => filterByCategory(activeCategory.value));

const loadMoreTrigger = ref(null);
useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
  if (isIntersecting && !loadingMore.value && hasMore.value) {
    loadMore();
  }
});

const selectCategory = (category: string) => {
  activeCategory.value = category;
};

const buyItem = (itemId: string) => {
  console.log('Buying item:', itemId);
};
</script>

<template>
  <ShopLayout 
    :categories="categories"
    :active-category="activeCategory"
    @select-category="selectCategory"
  >
    <ShopGrid :loading="loading">
      <template v-if="loading">
        <ShopItem 
          v-for="n in 8"
          :key="n"
          :item="{
            id: '',
            name: '',
            description: '',
            price: 0,
            inventory: 0,
            image: '../../assets/lg.png'
          }"
          :loading="true"
        />
      </template>
      
      <template v-else-if="filteredItems.length === 0">
        <div class="col-span-full flex items-center justify-center h-60 text-gray-500">
          <p>No items found in this category</p>
        </div>
      </template>
      
      <template v-else>
        <ShopItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @buy="buyItem"
        />
      </template>
    </ShopGrid>
    
    <div 
      v-if="!loading && hasMore"
      ref="loadMoreTrigger" 
      class="py-8 flex justify-center"
    >
      <div v-if="loadingMore" class="loading-spinner" />
    </div>
  </ShopLayout>
</template>

<style scoped>
.loading-spinner {
  @apply w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin;
}
</style>