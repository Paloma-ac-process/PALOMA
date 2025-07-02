<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Vitrine Client</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">
              Bonjour, {{ authStore.getUser ? (authStore.getUser.fullName || authStore.getUser.email) : 'Utilisateur' }}
            </span>
            <button 
              @click="handleLogout"
              :disabled="authStore.getLoading"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {{ authStore.getLoading ? 'Déconnexion...' : 'Déconnexion' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Bienvenue dans votre tableau de bord !
            </h2>
            
            <div v-if="authStore.getUser" class="space-y-2">
              <p class="text-gray-600">
                Vous êtes connecté en tant que : <strong>{{ authStore.getUser.email }}</strong>
              </p>
              <p v-if="authStore.getUser.fullName" class="text-gray-600">
                Nom : <strong>{{ authStore.getUser.fullName }}</strong>
              </p>
              <p v-if="authStore.getUser.createdAt" class="text-gray-600">
                Membre depuis : <strong>{{ formatDate(authStore.getUser.createdAt) }}</strong>
              </p>
            </div>
            
            <div v-else class="text-gray-600">
              Chargement des informations utilisateur...
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/login')
      } catch (error) {
        console.error('Erreur de déconnexion:', error)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Date inconnue'
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR')
    }

    onMounted(async () => {
      // Vérifier l'état d'authentification au chargement
      await authStore.checkAuth()
    })

    return {
      authStore,
      handleLogout,
      formatDate
    }
  }
}
</script> 