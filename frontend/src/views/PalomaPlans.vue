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
            class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/paloma/plans" 
            class="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
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
      <!-- Header avec filtres -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Plans d'incinérateurs</h2>
          <button 
            @click="showCreateModal = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nouveau plan
          </button>
        </div>

        <!-- Filtres -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <select v-model="filters.clientId" class="w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Tous les clients</option>
                <option v-for="client in clients" :key="client.id" :value="client.id">
                  {{ client.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select v-model="filters.type" class="w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Tous les types</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select v-model="filters.isActive" class="w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Tous</option>
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <input 
                v-model="filters.search" 
                type="text" 
                placeholder="Nom du plan..."
                class="w-full border-gray-300 rounded-md shadow-sm"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des plans -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="plan in filteredPlans" 
              :key="plan.id" 
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              @click="selectPlan(plan)"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center">
                  <div class="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">{{ plan.name }}</h3>
                    <p class="text-sm text-gray-500">{{ plan.client?.name }}</p>
                  </div>
                </div>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ plan.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </div>

              <div class="space-y-2">
                <p class="text-sm text-gray-600">{{ plan.description }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  {{ plan.type }}
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(plan.createdAt) }}
                </div>
              </div>

              <div class="mt-4 flex space-x-2">
                <button 
                  @click.stop="viewPlan(plan)"
                  class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Voir
                </button>
                <button 
                  @click.stop="editPlan(plan)"
                  class="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>

          <!-- Message si aucun plan -->
          <div v-if="filteredPlans.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun plan trouvé</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par créer un nouveau plan.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de création/édition -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showEditModal ? 'Modifier le plan' : 'Nouveau plan' }}
          </h3>
          
          <form @submit.prevent="savePlan">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom</label>
                <input 
                  v-model="planForm.name" 
                  type="text" 
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Client</label>
                <select v-model="planForm.clientId" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="">Sélectionner un client</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Type</label>
                <select v-model="planForm.type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  v-model="planForm.description" 
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Fichier</label>
                <input 
                  type="file" 
                  @change="handleFileUpload"
                  accept=".pdf,.dwg,.dxf"
                  class="mt-1 block w-full"
                >
              </div>

              <div class="flex items-center">
                <input 
                  v-model="planForm.isActive" 
                  type="checkbox" 
                  id="isActive"
                  class="h-4 w-4 text-primary-600 border-gray-300 rounded"
                >
                <label for="isActive" class="ml-2 block text-sm text-gray-900">
                  Plan actif
                </label>
              </div>
            </div>

            <div class="mt-6 flex space-x-3">
              <button 
                type="submit"
                class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                {{ showEditModal ? 'Modifier' : 'Créer' }}
              </button>
              <button 
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const plans = ref([])
const clients = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedPlan = ref(null)

const filters = ref({
  clientId: '',
  type: '',
  isActive: '',
  search: ''
})

const planForm = ref({
  name: '',
  clientId: '',
  type: '2D',
  description: '',
  filePath: '',
  isActive: true
})

const filteredPlans = computed(() => {
  return plans.value.filter(plan => {
    if (filters.value.clientId && plan.clientId !== parseInt(filters.value.clientId)) return false
    if (filters.value.type && plan.type !== filters.value.type) return false
    if (filters.value.isActive !== '' && plan.isActive !== (filters.value.isActive === 'true')) return false
    if (filters.value.search && !plan.name.toLowerCase().includes(filters.value.search.toLowerCase())) return false
    return true
  })
})

onMounted(async () => {
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
  
  await loadPlans()
  await loadClients()
})

const loadPlans = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('http://localhost:3333/api/plans', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      plans.value = data.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement des plans:', error)
  }
}

const loadClients = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('http://localhost:3333/api/clients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      clients.value = data.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement des clients:', error)
  }
}

const logout = () => {
  localStorage.removeItem('paloma_token')
  localStorage.removeItem('paloma_user')
  router.push('/paloma/login')
}

const selectPlan = (plan) => {
  selectedPlan.value = plan
}

const viewPlan = (plan) => {
  router.push(`/paloma/plans/${plan.id}`)
}

const editPlan = (plan) => {
  selectedPlan.value = plan
  planForm.value = { ...plan }
  showEditModal.value = true
}

const savePlan = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const url = showEditModal.value 
      ? `http://localhost:3333/api/plans/${selectedPlan.value.id}`
      : 'http://localhost:3333/api/plans'
    
    const method = showEditModal.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planForm.value)
    })

    if (response.ok) {
      await loadPlans()
      closeModal()
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    planForm.value.filePath = file.name
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedPlan.value = null
  planForm.value = {
    name: '',
    clientId: '',
    type: '2D',
    description: '',
    filePath: '',
    isActive: true
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR')
}
</script> 