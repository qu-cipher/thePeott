<script setup lang="ts">
import CoinsSection from '../components/CoinsSection.vue';
import SquadSection from '../components/SquadSection.vue';
import EngineSection from '../components/EngineSection.vue';
import Navigation from '../components/Navigation.vue';
import WelcomeModal from '../components/Modals/WelcomeModal.vue';
import { ref } from 'vue';

let show = ref(true);
</script>

<template>
  <div class="">
    <CoinsSection />
    <div class="container mx-auto px-4 pt-12 space-y-6">
      <SquadSection />
      <EngineSection />
    </div>
    <Navigation />
    
    <WelcomeModal 
      :show="show"
      @close="show = false"
    />
  </div>
</template>