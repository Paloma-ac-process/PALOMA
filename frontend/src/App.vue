<script setup>
import { useAuthStore } from '@/stores/authStore'
import AppHeader from '@/components/AppHeader.vue'
import { computed } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.getIsAuthenticated)
</script>

<template>
  <AppHeader v-if="isAuthenticated" />
  <router-view />
</template>
