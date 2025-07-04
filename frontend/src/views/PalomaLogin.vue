<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="w-1/2 bg-indigo-800 p-8 flex flex-col justify-center items-center">
        <img src="@/assets/paloma-logo.png" alt="PALOMA ERP" class="h-12 mb-6" />
        <h2 class="text-2xl font-bold text-white mb-2">Bienvenue dans votre espace</h2>
        <p class="text-indigo-100 mb-8 text-center">
          PALOMA, la solution ERP collaborative qui booste votre productivité
        </p>
        <img src="@/assets/illustration.svg" alt="Illustration" class="w-56" />
        <div class="mt-8 text-xs text-indigo-100">
          Accéder à <a href="#" class="underline">l'Aide en ligne</a> et la <a href="#" class="underline">Politique de confidentialité</a>
        </div>
      </div>
      <!-- Colonne droite : Formulaire -->
      <div class="w-1/2 p-8 flex flex-col justify-center">
        <h3 class="text-2xl font-semibold text-gray-800 mb-6">Se connecter</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input v-model="form.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Entrer votre adresse e-mail" />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input v-model="form.password" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Entrer votre mot de passe" />
          </div>
          <div class="mb-4 text-right">
            <router-link to="/forgot-password" class="text-indigo-700 text-sm underline">Mot de passe oublié ?</router-link>
          </div>
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3 mb-2 text-red-700 text-sm">{{ error }}</div>
          <button type="submit" :disabled="loading" class="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
        <div class="mt-6 text-center text-sm">
          Première connexion ? <router-link to="/register" class="underline text-indigo-700">Créer un compte</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await authService.login(form)
    if (data.success) {
      localStorage.setItem('paloma_user', JSON.stringify(data.user || {}))
      form.email = ''
      form.password = ''
      router.push('/paloma/dashboard')
    } else {
      error.value = data.message || 'Erreur de connexion'
    }
  } catch (err) {
    error.value = err.message || 'Erreur de connexion au serveur'
  } finally {
    loading.value = false
  }
}
</script> 