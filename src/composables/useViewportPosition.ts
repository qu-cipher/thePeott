import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

export const useViewportPosition = (defaultTopOffset = 10) => {
  const { height: windowHeight } = useWindowSize();
  const topOffset = ref(defaultTopOffset);

  const updatePosition = () => {
    // Convert viewport units to pixels
    topOffset.value = (windowHeight.value * defaultTopOffset) / 100;
  };

  onMounted(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updatePosition);
  });

  return {
    topOffset
  };
};