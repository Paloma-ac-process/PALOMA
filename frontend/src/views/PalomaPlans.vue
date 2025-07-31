<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <AppHeader />

      <!-- Page Content -->
      <main class="p-6">
        <!-- Header avec filtres -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Plans d'incinérateurs</h1>
              <p class="text-gray-600 mt-1">Gérez vos plans et visualisez vos installations</p>
            </div>
            <button 
              @click="showCreateModal = true"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center shadow-lg hover:shadow-xl transition-all"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Nouveau plan
            </button>
          </div>

          <!-- Filtres -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <select v-model="filters.clientId" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tous les clients</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select v-model="filters.type" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tous les types</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select v-model="filters.isActive" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tous</option>
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                <div class="relative">
                  <input 
                    v-model="filters.search" 
                    type="text" 
                    placeholder="Nom du plan..."
                    class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10"
                  >
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Plans</p>
                <p class="text-2xl font-bold text-gray-900">{{ filteredPlans.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Plans Actifs</p>
                <p class="text-2xl font-bold text-gray-900">{{ activePlansCount }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Récents (7j)</p>
                <p class="text-2xl font-bold text-gray-900">{{ recentPlansCount }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Interventions</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalInterventions }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des plans -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Liste des plans</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="plan in filteredPlans" :key="plan.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ plan.name }}</div>
                        <div class="text-sm text-gray-500">{{ plan.description || 'Aucune description' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ plan.client?.name || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="plan.type === '3D' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'">
                      {{ plan.type || '2D' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ plan.isActive ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(plan.createdAt) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        @click="viewPlan(plan)"
                        class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                      >
                        Voir
                      </button>
                      <button 
                        @click="editPlan(plan)"
                        class="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                      >
                        Modifier
                      </button>
                      <button 
                        @click="deletePlan(plan)"
                        class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
const plans = ref([])
const clients = ref([])
const showCreateModal = ref(false)
const filters = ref({
  clientId: '',
  type: '',
  isActive: '',
  search: ''
})

// Computed properties pour les statistiques
const filteredPlans = computed(() => {
  let filtered = plans.value

  if (filters.value.clientId) {
    filtered = filtered.filter(plan => plan.clientId == filters.value.clientId)
  }
  if (filters.value.type) {
    filtered = filtered.filter(plan => plan.type === filters.value.type)
  }
  if (filters.value.isActive !== '') {
    filtered = filtered.filter(plan => plan.isActive === (filters.value.isActive === 'true'))
  }
  if (filters.value.search) {
    filtered = filtered.filter(plan => 
      plan.name.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }

  return filtered
})

const activePlansCount = computed(() => {
  return plans.value.filter(plan => plan.isActive).length
})

const recentPlansCount = computed(() => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return plans.value.filter(plan => new Date(plan.createdAt) > sevenDaysAgo).length
})

const totalInterventions = computed(() => {
  return plans.value.reduce((total, plan) => total + (plan.interventions?.length || 0), 0)
})

onMounted(async () => {
  await loadPlans()
  await loadClients()
})

const loadPlans = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('https://paloma-production.up.railway.app/api/plans', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      plans.value = data.data || []
    }
  } catch (error) {
    console.error('Erreur lors du chargement des plans:', error)
  }
}

const loadClients = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('https://paloma-production.up.railway.app/api/clients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      clients.value = data.data || []
    }
  } catch (error) {
    console.error('Erreur lors du chargement des clients:', error)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const viewPlan = (plan) => {
  router.push(`/paloma/plans/${plan.id}`)
}

const editPlan = (plan) => {
  // Logique pour éditer un plan
  console.log('Éditer le plan:', plan)
}

const deletePlan = async (plan) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le plan "${plan.name}" ?`)) {
    try {
      const token = localStorage.getItem('paloma_token')
      const response = await fetch(`https://paloma-production.up.railway.app/api/plans/${plan.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await loadPlans()
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }
}
</script> 