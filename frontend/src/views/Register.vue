<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Colonne gauche : Branding -->
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
        <router-link to="/login" class="text-sm text-gray-500 hover:text-indigo-700 mb-4 flex items-center">
          <span class="mr-2">←</span> Retour à se connecter
        </router-link>
        <h3 class="text-2xl font-semibold text-gray-800 mb-6">Créer un compte</h3>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input v-model="fullName" type="text" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Votre nom complet" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input v-model="email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Entrer votre adresse e-mail" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input v-model="password" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Créer un mot de passe" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input v-model="passwordConfirm" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Confirmer le mot de passe" />
          </div>
          <div v-if="message" class="bg-green-50 border border-green-200 rounded-md p-3 mb-2 text-green-700 text-sm">{{ message }}</div>
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3 mb-2 text-red-700 text-sm">{{ error }}</div>
          <button type="submit" :disabled="loading" class="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>
        <div class="mt-6 text-center text-sm">
          Déjà inscrit ? <router-link to="/login" class="underline text-indigo-700">Se connecter</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const error = ref('')
const message = ref('')

const handleRegister = async () => {
  error.value = ''
  message.value = ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Adresse email invalide.'
    return
  }
  if (password.value !== passwordConfirm.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  loading.value = true
  try {
    await authService.register({ fullName: fullName.value, email: email.value, password: password.value })
    // Redirige vers la page d'activation avec l'email pré-rempli
    router.push({ path: '/activate-account', query: { email: email.value } })
  } catch (err) {
    error.value = err.message || 'Erreur lors de la création du compte.'
  } finally {
    loading.value = false
  }
}
</script> 