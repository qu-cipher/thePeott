<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  categories: string[];
  activeCategory: string;
}>();

const emit = defineEmits<{
  (e: 'select', category: string): void;
}>();

const tabsContainer = ref<HTMLDivElement | null>(null);
let isScrolling = false;

const scrollToTab = (category: string) => {
  if (!tabsContainer.value) return;
  
  const tab = tabsContainer.value.querySelector(`[data-category="${category}"]`);
  if (!tab) return;

  const container = tabsContainer.value;
  const tabRect = (tab as HTMLElement).getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const scrollLeft = container.scrollLeft + tabRect.left - containerRect.left - 
    (containerRect.width / 2) + (tabRect.width / 2);

  container.scrollTo({
    left: scrollLeft,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      isScrolling = false;
    });
  }
};

onMounted(() => {
  if (props.activeCategory) {
    scrollToTab(props.activeCategory);
  }
});
</script>

<template>
  <div 
    ref="tabsContainer"
    class="categories-container"
    @scroll="handleScroll"
  >
    <button
      v-for="category in categories"
      :key="category"
      :data-category="category"
      class="category-tab"
      :class="{ active: category === activeCategory }"
      @click="emit('select', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<style scoped>
.categories-container {
  @apply flex gap-2 px-4 py-3 overflow-x-auto snap-x snap-mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categories-container::-webkit-scrollbar {
  display: none;
}

.category-tab {
  @apply px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
    bg-gray-800 text-gray-300 hover:bg-gray-700 snap-center;
}

.category-tab.active {
  @apply bg-primary-600 text-white;
}

@media (hover: hover) {
  .category-tab:hover:not(.active) {
    @apply bg-gray-700 text-white;
  }
}
</style>