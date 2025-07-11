<template>
  <div class="min-h-screen bg-gray-50">
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
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <router-link 
            to="/paloma/dashboard" 
            class="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/paloma/plans" 
            class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Plans
          </router-link>
          <router-link 
            to="/paloma/exports" 
            class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Exports
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Informations utilisateur -->
      <section class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-lg font-bold mb-2">Informations utilisateur</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span class="font-semibold">Nom :</span> {{ user?.fullName || user?.email || '-' }}</div>
          <div><span class="font-semibold">Email :</span> {{ user?.email || '-' }}</div>
          <div><span class="font-semibold">Rôle :</span> {{ user?.role || '-' }}</div>
          <div><span class="font-semibold">Inscription :</span> {{ user?.createdAt ? formatDate(user.createdAt) : '-' }}</div>
        </div>
        <button @click="showEditUser = true" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Modifier</button>
        <div v-if="showEditUser" class="mt-4 bg-gray-50 p-4 rounded shadow-inner">
          <form @submit.prevent="updateUserInfo">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                <input v-model="editUser.fullName" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="editUser.email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                <input v-model="editUser.password" type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>
            <div class="mt-4 flex space-x-2">
              <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enregistrer</button>
              <button type="button" @click="showEditUser = false" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
            </div>
            <div v-if="userUpdateMessage" class="mt-2 text-green-600">{{ userUpdateMessage }}</div>
            <div v-if="userUpdateError" class="mt-2 text-red-600">{{ userUpdateError }}</div>
          </form>
        </div>
      </section>

      <!-- KPIs -->
      <div v-if="dashboardData.kpis && Object.keys(dashboardData.kpis).length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Clients actifs</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ dashboardData.kpis.totalClients }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Plans actifs</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ dashboardData.kpis.activePlans }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Interventions ce mois</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ dashboardData.kpis.interventionsThisMonth }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Temps de réponse moyen</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ dashboardData.kpis.averageResponseTime }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Légende KPIs -->
      <div v-if="dashboardData.kpis && Object.keys(dashboardData.kpis).length" class="mb-8 flex flex-wrap gap-4 items-center">
        <span class="flex items-center"><span class="inline-block w-4 h-4 bg-blue-500 rounded mr-2"></span>Clients actifs</span>
        <span class="flex items-center"><span class="inline-block w-4 h-4 bg-green-500 rounded mr-2"></span>Plans actifs</span>
        <span class="flex items-center"><span class="inline-block w-4 h-4 bg-yellow-500 rounded mr-2"></span>Interventions ce mois</span>
        <span class="flex items-center"><span class="inline-block w-4 h-4 bg-purple-500 rounded mr-2"></span>Temps de réponse moyen</span>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Activité récente -->
        <div v-if="dashboardData.recentActivity && dashboardData.recentActivity.length" class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Activité récente
            </h3>
            <div class="flow-root">
              <ul class="-mb-8">
                <li v-for="(activity, index) in dashboardData.recentActivity" :key="activity.id">
                  <div class="relative pb-8">
                    <span v-if="index !== dashboardData.recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white" :class="getActivityIconClass(activity.type)">
                          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path v-if="activity.type === 'intervention'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            <path v-else fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-500">{{ activity.description }}</p>
                          <p class="text-xs text-gray-400">{{ activity.client }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          <time :datetime="activity.date">{{ formatDate(activity.date) }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Alertes -->
        <div v-if="dashboardData.alerts && dashboardData.alerts.length" class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Alertes
            </h3>
            <div class="space-y-4">
              <div v-for="alert in dashboardData.alerts" :key="alert.id" class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-700">{{ alert.message }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(alert.date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const showEditUser = ref(false)
const editUser = ref({ fullName: '', email: '', password: '' })
const userUpdateMessage = ref('')
const userUpdateError = ref('')
const dashboardData = ref({
  kpis: {
    totalClients: 0,
    activePlans: 0,
    interventionsThisMonth: 0,
    averageResponseTime: '0h'
  },
  recentActivity: [],
  alerts: []
})

onMounted(async () => {
  // Toujours charger les infos du localStorage
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
    editUser.value.fullName = user.value.fullName || ''
    editUser.value.email = user.value.email || ''
    editUser.value.password = ''
  }

  // Charger les données du dashboard
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('http://localhost:3333/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      dashboardData.value = data.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error)
  }
}

const logout = () => {
  localStorage.removeItem('paloma_token')
  localStorage.removeItem('paloma_user')
  router.push('/paloma/login')
}

const getActivityIconClass = (type) => {
  switch (type) {
    case 'intervention':
      return 'bg-blue-500'
    case 'export':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateUserInfo = async () => {
  userUpdateMessage.value = ''
  userUpdateError.value = ''
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('http://localhost:3333/api/me', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: editUser.value.fullName,
        email: editUser.value.email,
        password: editUser.value.password || undefined
      })
    })
    const data = await response.json()
    if (data.success) {
      user.value = data.user
      localStorage.setItem('paloma_user', JSON.stringify(data.user))
      userUpdateMessage.value = 'Informations mises à jour !'
      showEditUser.value = false
    } else {
      userUpdateError.value = data.message || 'Erreur lors de la mise à jour.'
    }
  } catch (err) {
    userUpdateError.value = 'Erreur lors de la mise à jour.'
  }
}
</script> 