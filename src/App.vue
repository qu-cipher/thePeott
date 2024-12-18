<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppLoading } from './composables/useAppLoading';
import LoadingCoinsSection from './components/loading/LoadingCoinsSection.vue';
import LoadingSquadSection from './components/loading/LoadingSquadSection.vue';
import LoadingEngineSection from './components/loading/LoadingEngineSection.vue';

const { isLoading, finishLoading } = useAppLoading();

onMounted(async () => {
  // Simulate initial data loading
  await new Promise(resolve => setTimeout(resolve, 1500));
  finishLoading();
});
</script>

<template>
  <div id="app" class="min-h-screen">
    <template v-if="isLoading">
      <div class="loading-app animate-fade-in">
        <LoadingCoinsSection />
        <div class="container mx-auto px-4 pt-16 space-y-6">
          <LoadingSquadSection />
          <LoadingEngineSection />
        </div>
      </div>
    </template>
    <router-view v-else v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#app {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>