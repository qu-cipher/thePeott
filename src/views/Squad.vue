<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="squad">
    <button class="back-button" @click="router.back()">← Back</button>
    <h1>Squad Details</h1>
    <!-- Squad details will be implemented here -->
  </div>
</template>

<style scoped>
.squad {
  padding: 1rem;
}

.back-button {
  margin-bottom: 1rem;
}
</style>