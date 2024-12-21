<script setup lang="ts">
import { onMounted } from 'vue';
import Modal from './Modal.vue';
import confetti from 'canvas-confetti';

const props = defineProps({
  show: {
    type: Boolean
  }
})

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
  triggerConfetti()
});
</script>

<template>
  
  <Modal :show="props.show">
      <template #banner>
        <img src="../../assets/lg.png" alt="Welcome" class="w-32 h-32 mx-auto rounded">
      </template>

      <template #content>
        <h2 class="modal-title">Welcome to ThePeott!</h2>
          <p class="modal-description">
            Start your mining journey with our powerful engine system. Join a squad, 
            earn coins, and upgrade your equipment in the 
            <strong>shop</strong>.
          </p><br>
          <button 
            class="modal-button"
            @click="$emit('close')"
          >
            Get Started
          </button>
      </template>
  </Modal>
</template>

<style scoped>
.modal-button {
  @apply bg-primary-500 text-white px-8 py-3 rounded-xl font-medium
    hover:bg-primary-600 transition-colors;
}
</style>