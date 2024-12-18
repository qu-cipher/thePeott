<script setup lang="ts">
import { ref } from 'vue';
import CategoryTabs from './CategoryTabs.vue';
import Navigation from '../Navigation.vue';

defineProps<{
  categories: string[];
  activeCategory: string;
}>();

const emit = defineEmits<{
  (e: 'selectCategory', category: string): void;
}>();
</script>

<template>
  <div class="shop-layout min-h-screen pb-20">
    <CategoryTabs 
      :categories="categories"
      :active-category="activeCategory"
      @select="category => emit('selectCategory', category)"
    />
    
    <div class="shop-content px-4 py-6">
      <slot />
    </div>
    
    <Navigation />
  </div>
</template>