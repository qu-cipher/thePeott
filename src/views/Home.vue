<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useFirstVisit } from '../composables/useFirstVisit';
import confetti from 'canvas-confetti';

import CoinsSection from '../components/CoinsSection.vue';
import SquadSection from '../components/SquadSection.vue';
import EngineSection from '../components/EngineSection.vue';
import Navigation from '../components/Navigation.vue';
import AnnouncementModal from '../components/Modals/AnnouncementModal.vue';


const { isFirstVisit, checkFirstVisit } = useFirstVisit();

var duration = 2 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 15, spread: 360, ticks: 60, zIndex: 200 };

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function triggerConfetti() {
  var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 30 * (timeLeft / duration);
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0, 0.5), y: Math.random() } });
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() } });
}, 300);
}

onMounted(() => {
  checkFirstVisit();
  watch(isFirstVisit, (newVal) => {
    if (newVal) {
      triggerConfetti();
    }
  }, { immediate: true });
});

const show = true;
</script>


<template>
  <div class="min-h-screen pb-20 space-y-6">
    <CoinsSection />
    <div class="container mx-auto px-4 pt-12 space-y-6">
      <SquadSection />
      <EngineSection />
    </div>
    <Navigation />
    
    <AnnouncementModal 
      :show="isFirstVisit"
      @close="isFirstVisit = false"
    />
  </div>
</template>