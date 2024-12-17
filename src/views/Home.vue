<script setup lang="ts">
import CoinsSection from '../components/CoinsSection.vue'
import SquadSection from '../components/SquadSection.vue'
import EngineSection from '../components/EngineSection.vue'
import Navigation from '../components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen pb-20 space-y-6">
    <CoinsSection />
    <div class="container mx-auto px-4 pt-16 space-y-6">
      <SquadSection />
      <EngineSection />
    </div>
    <Navigation />
  </div>
</template>