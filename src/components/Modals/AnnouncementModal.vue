<script setup lang="ts">
import Modal from './Modal.vue';
import { defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Boolean
  }
})
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
            @click="$emit('close-modal')"
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