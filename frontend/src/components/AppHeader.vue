<template>
  <header class="bg-white shadow-sm border-b">
    <div class="px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Breadcrumb -->
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <span>🏠</span>
          <span>/</span>
          <span class="text-gray-900 font-medium">{{ pageTitle }}</span>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z"></path>
            </svg>
            <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {{ notifications.length }}
            </span>
          </button>

          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ user?.fullName || user?.email }}</div>
              <div class="text-xs text-gray-500">{{ user?.role }}</div>
            </div>
            <button @click="showUserMenu = !showUserMenu" class="relative">
              <div class="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {{ user?.fullName?.charAt(0) || user?.email?.charAt(0) }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)
const showUserMenu = ref(false)
const notifications = ref([])

// Titre de la page basé sur la route
const pageTitle = computed(() => {
  switch (route.path) {
    case '/paloma/dashboard':
      return 'Dashboard'
    case '/paloma/plans':
      return 'Plans'
    case '/paloma/exports':
      return 'Exports'
    default:
      return 'Paloma'
  }
})

onMounted(() => {
  // Charger les données utilisateur
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})
</script>

<style scoped>
.navbar-brand img {
  height: 32px;
}
.navbar-toggler {
  display: block !important;
  margin-left: auto;
}
</style> 