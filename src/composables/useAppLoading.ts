import { ref } from 'vue';

export const useAppLoading = () => {
  const isLoading = ref(true);
  const loadingProgress = ref(0);

  const startLoading = () => {
    isLoading.value = true;
    loadingProgress.value = 0;
  };

  const updateProgress = (progress: number) => {
    loadingProgress.value = Math.min(100, Math.max(0, progress));
  };

  const finishLoading = () => {
    loadingProgress.value = 100;
    setTimeout(() => {
      isLoading.value = false;
    }, 500); // Smooth transition delay
  };

  return {
    isLoading,
    loadingProgress,
    startLoading,
    updateProgress,
    finishLoading
  };
};