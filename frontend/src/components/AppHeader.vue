<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/paloma-apps">
        <img src="/paloma-logo.png" alt="Logo" height="32" class="me-2" />
        PALOMA
      </router-link>
      <div :class="['navbar-collapse', menuOpen ? 'show' : 'collapse']" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" @click.stop>
          <li class="nav-item">
            <router-link class="nav-link" to="/paloma-apps">Applications</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/paloma/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin/users">Utilisateurs</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin/clients">Clients</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin/plans">Plans</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin/exports">Exports</router-link>
          </li>
        </ul>
        <span class="navbar-text me-3">
          Bonjour, <b>{{ userName }}</b>
        </span>
        <button class="btn btn-outline-danger btn-sm me-2" @click="logout">Déconnexion</button>
      </div>
      <!-- Bouton burger tout à droite -->
      <button class="navbar-toggler d-block ms-auto" type="button" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const isAdmin = computed(() => authStore.getUser?.role === 'admin')
const userName = computed(() => authStore.getUser?.fullName || authStore.getUser?.email || 'Utilisateur')

const menuOpen = ref(false)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
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