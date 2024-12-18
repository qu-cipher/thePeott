import { ref, computed } from 'vue';
import type { ShopItem } from '../types/shop';

export const useShopItems = () => {
  const items = ref<ShopItem[]>([]);
  const loading = ref(true);
  const loadingMore = ref(false);
  const hasMore = ref(true);
  const page = ref(1);

  const loadItems = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    items.value = [
      {
        id: '1',
        name: 'Turbo Engine X1000',
        description: 'High-performance mining engine with advanced cooling system',
        price: 50000,
        inventory: 5,
        image: '/src/assets/lg.png',
        category: 'Engines'
      },
      // Add more items...
    ];
    
    loading.value = false;
  };

  const loadMore = async () => {
    if (loadingMore.value || !hasMore.value) return;
    
    loadingMore.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add more items...
    loadingMore.value = false;
    page.value++;
    
    if (page.value >= 5) hasMore.value = false;
  };

  const filterByCategory = (category: string) => {
    if (category === 'All') return items.value;
    return items.value.filter(item => item.category === category);
  };

  // Load initial items
  loadItems();

  return {
    items,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    filterByCategory
  };
};