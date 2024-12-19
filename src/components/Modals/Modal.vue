<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modalRef = ref<HTMLDivElement | null>(null);
const closeModal = () => {
    if (modalRef.value) {
        modalRef.value.classList.add('modal-leave');
        modalRef.value.classList.remove('modal-enter');
        setTimeout(() => {
            emit('close');
        }, 300);
    }
};

onMounted(() => {
  if (modalRef.value) {
    modalRef.value.classList.add('modal-enter');
  }
});
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay" @click="closeModal" style="z-index: 100;">
      <div 
        ref="modalRef"
        class="modal-container"
        @click.stop
        style="z-index: 300;"
      >
        <button class="modal-close" @click="closeModal">
          <XMarkIcon class="w-6 h-6" />
        </button>

        <div class="modal-image">
          <slot name="banner"></slot>
        </div>

        <div class="modal-content">
            <slot name="content"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/75 backdrop-blur-sm z-50
    flex items-center justify-center p-4;
}

.modal-container {
  @apply bg-gray-800 rounded-2xl max-w-md w-full relative
    overflow-hidden shadow-xl opacity-0 translate-y-4;
}

.modal-close {
  @apply absolute top-4 right-4 text-gray-400 hover:text-white
    transition-colors p-1 rounded-full hover:bg-white/10;
}

.modal-image {
  @apply pt-12 pb-6 bg-gradient-to-b from-primary-900/50 to-transparent;
}

.modal-content {
  @apply px-6 pb-8 text-center;
}

.modal-title {
  @apply text-2xl font-bold mb-4 text-white;
}

.modal-description {
  @apply text-gray-300 mb-8 leading-relaxed;
}

.modal-enter {
  animation: modal-enter 0.3s ease forwards;
}

.modal-leave {
  animation: modal-leave 0.3s ease forwards;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    display: none;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    display: block;
    transform: translateY(0);
  }
}

@keyframes modal-leave {
  from {
    opacity: 1;
    display: block;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    display: none;
    transform: translateY(1rem);
  }
}
</style>