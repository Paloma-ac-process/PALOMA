<template>
  <aside class="w-64 bg-white shadow-lg fixed h-full z-30">
    <div class="p-6">
      <!-- Logo -->
      <div class="flex items-center mb-8">
        <div class="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="ml-3 text-xl font-bold text-gray-900">PALOMA</h1>
      </div>

      <!-- Navigation -->
      <nav class="space-y-2">
        <router-link 
          to="/paloma/dashboard" 
          class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          :class="{ 'text-gray-700 bg-blue-50 border-r-4 border-blue-500': $route.path === '/paloma/dashboard' }"
        >
          <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          </svg>
          Dashboard
        </router-link>
        
        <router-link 
          to="/paloma/plans" 
          class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          :class="{ 'text-gray-700 bg-blue-50 border-r-4 border-blue-500': $route.path.includes('/paloma/plans') }"
        >
          <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Plans
        </router-link>
        
        <router-link 
          to="/paloma/exports" 
          class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          :class="{ 'text-gray-700 bg-blue-50 border-r-4 border-blue-500': $route.path.includes('/paloma/exports') }"
        >
          <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Exports
        </router-link>
      </nav>

      <!-- Applications -->
      <div class="mt-8">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Applications</h3>
        <div class="space-y-2">
          <button 
            v-for="app in industrialApps" 
            :key="app.name"
            @click="launchApp(app)"
            class="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group"
          >
            <div class="h-8 w-8 rounded-lg flex items-center justify-center mr-3" :class="app.bgColor">
              <span class="text-white text-sm">{{ app.icon }}</span>
            </div>
            <div class="flex-1 text-left">
              <div class="font-medium">{{ app.name }}</div>
              <div class="text-xs text-gray-500">{{ app.status }}</div>
            </div>
            <svg class="h-4 w-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

// Applications industrielles
const industrialApps = ref([
  {
    name: 'Jumeau Numérique',
    icon: '🔬',
    bgColor: 'bg-blue-500',
    status: 'Disponible',
    url: '/apps/digital-twin'
  },
  {
    name: 'Reporting',
    icon: '📊',
    bgColor: 'bg-green-500',
    status: 'Disponible',
    url: '/apps/reporting'
  },
  {
    name: 'Calculs Thermiques',
    icon: '🌡️',
    bgColor: 'bg-orange-500',
    status: 'Disponible',
    url: '/apps/thermal'
  },
  {
    name: 'DAO',
    icon: '✏️',
    bgColor: 'bg-purple-500',
    status: 'Maintenance',
    url: '/apps/cad'
  },
  {
    name: 'CFD',
    icon: '🌊',
    bgColor: 'bg-cyan-500',
    status: 'Disponible',
    url: '/apps/cfd'
  }
])

const launchApp = (app) => {
  if (app.status === 'Disponible') {
    // Ouvrir l'application
    window.open(app.url, '_blank')
  } else {
    alert(`${app.name} est actuellement en maintenance`)
  }
}
</script> 