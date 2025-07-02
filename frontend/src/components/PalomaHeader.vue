<template>
  <div>
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <div class="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 class="ml-3 text-xl font-semibold text-gray-900">PALOMA ERP</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ user?.firstName }} {{ user?.lastName }}</span>
            <button @click="logout" class="text-sm text-gray-500 hover:text-gray-700">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <router-link 
            to="/paloma/dashboard" 
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            :class="currentRoute === '/paloma/dashboard' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/paloma/plans" 
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            :class="currentRoute === '/paloma/plans' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Plans
          </router-link>
          <router-link 
            to="/paloma/exports" 
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            :class="currentRoute === '/paloma/exports' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Exports
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const user = ref(null)

const currentRoute = computed(() => route.path)

onMounted(() => {
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

const logout = () => {
  localStorage.removeItem('paloma_token')
  localStorage.removeItem('paloma_user')
  router.push('/paloma/login')
}
</script> 