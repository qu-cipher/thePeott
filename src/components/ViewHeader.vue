<script setup>
import { useRouter } from 'vue-router';

const prop = defineProps({
    title: {
        type: String, 
        default: "Header"
    }
});

const router = useRouter();

const goBack = () => {
  router.push("/");
};
</script>

<template>
    <header class="ios-header">
      <button class="back-btn" @click="goBack">
        <h1>← {{ prop.title }}</h1>
      </button>
    </header>
</template>

<style lang="css" scoped>
.ios-header {
  @apply sticky inset-0 bg-black/75 backdrop-blur-sm z-50
  flex items-center justify-center p-2 h-16; 
}

.ios-header h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 auto;
}

.ios-header .back-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: hsl(211, 100%, 70%);
  font-size: 1.1rem;
}

.chevronr {
  width: 1.3rem;
  height: 1.35rem;
  color: hsl(211, 100%, 70%);
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .ios-header {
    background: rgba(36, 36, 36, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
</style>