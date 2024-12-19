<script setup>
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import ViewHeader from '../components/ViewHeader.vue';

const appVersion = '1.0.0';
const releaseDate = '2024-02-21';

const settings = ref({
  notifications: true,
  soundEffects: true,
  darkMode: true,
  autoMining: false
});

const navigateToSection = (section) => {
  console.log(`Navigate to ${section}`);
};

const clearCache = () => {
  if(confirm("Are you sure you want to clear cache?")) {
    localStorage.clear();
  } 
};
</script>

<template>
  <div class="settings-view">
    <ViewHeader title="Settings" />
    <div class="settings-content">
      <!-- Account Section -->
      <div class="settings-group">
        <div class="settings-item account-item" @click="navigateToSection('account')">
          <div class="account-info">
            <div class="account-avatar">👤</div>
            <div class="account-details">
              <h2>CryptoMiner42</h2>
              <p>View profile and account settings</p>
            </div>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>

      <!-- Mining Settings -->
      <div class="settings-group">
        <h3>Mining</h3>
        <div class="settings-item" @click="navigateToSection('auto-mining')">
          <span>Auto Mining</span>
          <div class="item-right">
            <span class="status">Off</span>
            <ChevronRightIcon class="chevron" />
          </div>
        </div>
        <div class="settings-item" @click="navigateToSection('power-settings')">
          <span>Power Settings</span>
          <ChevronRightIcon class="chevron" />
        </div>
        <div class="settings-item" @click="navigateToSection('gas-management')">
          <span>Gas Management</span>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>

      <!-- Notifications -->
      <div class="settings-group">
        <h3>Notifications</h3>
        <div class="settings-item" @click="navigateToSection('notifications')">
          <span>Push Notifications</span>
          <div class="item-right">
            <span class="status">On</span>
            <ChevronRightIcon class="chevron" />
          </div>
        </div>
        <div class="settings-item" @click="navigateToSection('sounds')">
          <span>Sounds & Haptics</span>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>

      <!-- General -->
      <div class="settings-group">
        <h3>General</h3>
        <div class="settings-item" @click="navigateToSection('language')">
          <span>Language</span>
          <div class="item-right">
            <span class="value">English</span>
            <ChevronRightIcon class="chevron" />
          </div>
        </div>
        <div class="settings-item" @click="navigateToSection('appearance')">
          <span>Appearance</span>
          <div class="item-right">
            <span class="value">Dark</span>
            <ChevronRightIcon class="chevron" />
          </div>
        </div>
      </div>

      <!-- Support -->
      <div class="settings-group">
        <h3>Support</h3>
        <div class="settings-item" @click="navigateToSection('help')">
          <span>Help Center</span>
          <ChevronRightIcon class="chevron" />
        </div>
        <div class="settings-item" @click="navigateToSection('privacy')">
          <span>Privacy Policy</span>
          <ChevronRightIcon class="chevron" />
        </div>
        <div class="settings-item" @click="navigateToSection('terms')">
          <span>Terms of Service</span>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>

      <!-- Developer options -->
      <div class="settings-group">
        <h3>Developer</h3>
        <div class="settings-item" @click="clearCache()">
          <span>Clear cache</span>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>

      <!-- App Info -->
      <div class="settings-footer">
        <div class="flex flex-col items-center">
          <img src="../assets/lg.png" alt="App Logo" class="app-logo" />
          <p class="version">Version {{ appVersion }}</p>
          <p class="release-date">Released {{ releaseDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-view {
  @apply min-h-screen bg-gray-900;
  padding-bottom: 5rem;
}

.settings-content {
  @apply py-4;
}

.settings-group {
  @apply mx-6 my-6 bg-gray-800/50 rounded-xl overflow-hidden;
}

.settings-group h3 {
  @apply text-sm text-gray-400 px-4 py-2 m-0 uppercase tracking-wider;
}

.settings-item {
  @apply flex justify-between items-center px-4 py-3 bg-gray-800/50 border-b border-gray-700/50 cursor-pointer transition-colors;
}

.settings-item:last-child {
  @apply border-b-0;
}

.settings-item:active {
  @apply bg-gray-700/50;
}

.account-item {
  @apply p-4;
}

.account-info {
  @apply flex items-center gap-4;
}

.account-avatar {
  @apply bg-gray-700 rounded-full flex items-center justify-center text-3xl;
  width: 60px;
  height: 60px;
}

.account-details h2 {
  @apply m-0 text-lg text-gray-100;
}

.account-details p {
  @apply m-0 text-sm text-gray-400;
}

.item-right {
  @apply flex items-center gap-2;
}

.status, .value {
  @apply text-sm text-gray-400;
}

.chevron {
  @apply w-5 h-5 text-gray-500;
}

.settings-footer {
  @apply px-8 py-12;
}

.app-logo {
  @apply mb-4;
  width: 60px;
  height: 60px;
  border-radius:50%; 
}

.version {
  @apply text-sm text-gray-400 m-0;
}

.release-date {
  @apply text-xs text-gray-500 mt-1 mb-0;
}
</style>