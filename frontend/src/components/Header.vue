<template>
  <header class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
            <span class="text-indigo-600 font-extrabold text-lg">V</span>
          </div>
          <span class="text-white font-bold text-xl tracking-tight">Vitrine Client</span>
        </router-link>

        <!-- Navigation principale -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link to="/" class="text-white font-medium hover:text-indigo-200 transition px-2 py-1 rounded" active-class="bg-white bg-opacity-20 text-white">Accueil</router-link>
          <router-link to="/about" class="text-white font-medium hover:text-indigo-200 transition px-2 py-1 rounded" active-class="bg-white bg-opacity-20 text-white">À propos</router-link>
          <router-link to="/services" class="text-white font-medium hover:text-indigo-200 transition px-2 py-1 rounded" active-class="bg-white bg-opacity-20 text-white">Services</router-link>
          <router-link to="/contact" class="text-white font-medium hover:text-indigo-200 transition px-2 py-1 rounded" active-class="bg-white bg-opacity-20 text-white">Contact</router-link>
        </nav>

        <!-- Menu utilisateur -->
        <div class="flex items-center space-x-4">
          <div v-if="authStore.getIsAuthenticated" class="relative">
            <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none group">
              <div class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg border-2 border-indigo-200 group-hover:border-white transition">
                {{ getUserInitials() }}
              </div>
              <span class="hidden sm:block text-white font-medium">{{ authStore.getUser?.fullName || authStore.getUser?.email }}</span>
              <svg class="w-4 h-4 text-white ml-1 group-hover:text-indigo-200 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- Menu déroulant -->
            <transition name="fade">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <div class="px-4 py-2 border-b border-gray-100">
                  <div class="text-sm font-semibold text-indigo-700 truncate">{{ authStore.getUser?.fullName || authStore.getUser?.email }}</div>
                  <div class="text-xs text-gray-400 truncate">{{ authStore.getUser?.email }}</div>
                </div>
                <router-link to="/dashboard" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" @click="closeMenus">Tableau de bord principal</router-link>
                <router-link to="/paloma/dashboard" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" @click="closeMenus">Dashboard PALOMA</router-link>
                <router-link to="/paloma/plans" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" @click="closeMenus">Plans PALOMA</router-link>
                <router-link to="/paloma/exports" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" @click="closeMenus">Exports PALOMA</router-link>
                <div class="border-t border-gray-100 my-2"></div>
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Déconnexion</button>
              </div>
            </transition>
          </div>
          <router-link
            v-else
            to="/login"
            class="inline-flex items-center px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50 transition"
          >
            Connexion
          </router-link>
          <!-- Burger menu mobile -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 text-white hover:bg-indigo-700 rounded-lg transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      <!-- Menu mobile -->
      <transition name="fade">
        <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-indigo-200 bg-white rounded-b-xl shadow">
          <nav class="space-y-2">
            <router-link to="/" class="block px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 rounded transition" @click="closeMenus">Accueil</router-link>
            <router-link to="/about" class="block px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 rounded transition" @click="closeMenus">À propos</router-link>
            <router-link to="/services" class="block px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 rounded transition" @click="closeMenus">Services</router-link>
            <router-link to="/contact" class="block px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 rounded transition" @click="closeMenus">Contact</router-link>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) showMobileMenu.value = false
}
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) showUserMenu.value = false
}
const closeMenus = () => {
  showUserMenu.value = false
  showMobileMenu.value = false
}
const handleLogout = async () => {
  await authStore.logout()
  closeMenus()
  router.push('/login')
}
const getUserInitials = () => {
  if (!authStore.getUser) return 'U'
  const name = authStore.getUser.fullName || authStore.getUser.email
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) showUserMenu.value = false
  if (!event.target.closest('header')) showMobileMenu.value = false
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 