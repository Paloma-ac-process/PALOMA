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
            class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
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
            class="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Exports
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header avec bouton nouveau -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Exports</h2>
          <button 
            @click="showCreateModal = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Nouvel export
          </button>
        </div>
      </div>

      <!-- Liste des exports -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fichier
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créé le
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="exportItem in exports" :key="exportItem.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg v-if="exportItem.type === 'pdf'" class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                          </svg>
                          <svg v-else class="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ exportItem.filename }}</div>
                        <div class="text-sm text-gray-500">{{ formatFileSize(exportItem.fileSize) }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ exportItem.type.toUpperCase() }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ exportItem.client?.name || 'Tous' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(exportItem.status)"
                    >
                      {{ getStatusText(exportItem.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(exportItem.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        v-if="exportItem.status === 'completed'"
                        @click="downloadExport(exportItem)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Télécharger
                      </button>
                      <button 
                        @click="deleteExport(exportItem)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Message si aucun export -->
          <div v-if="exports.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun export</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par créer un nouvel export.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de création d'export -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Nouvel export</h3>
          
          <form @submit.prevent="createExport">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Type d'export</label>
                <select v-model="exportForm.type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Client</label>
                <select v-model="exportForm.clientId" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="">Tous les clients</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  v-model="exportForm.description" 
                  rows="3"
                  placeholder="Description de l'export..."
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Configuration</label>
                <div class="mt-2 space-y-2">
                  <label class="flex items-center">
                    <input v-model="exportForm.config.includePlans" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Inclure les plans</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="exportForm.config.includeMaterials" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Inclure les matériaux</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="exportForm.config.includeInterventions" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Inclure les interventions</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 flex space-x-3">
              <button 
                type="submit"
                class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Créer l'export
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const exports = ref([])
const clients = ref([])
const showCreateModal = ref(false)

const exportForm = ref({
  type: 'pdf',
  clientId: '',
  description: '',
  config: {
    includePlans: true,
    includeMaterials: true,
    includeInterventions: true
  }
})

onMounted(async () => {
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
  
  await loadExports()
  await loadClients()
})

const loadExports = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('https://paloma-production.up.railway.app/api/exports', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      exports.value = data.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement des exports:', error)
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

const createExport = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('https://paloma-production.up.railway.app/api/exports', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exportForm.value)
    })

    if (response.ok) {
      await loadExports()
      closeModal()
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'export:', error)
  }
}

const downloadExport = async (exportItem) => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch(`https://paloma-production.up.railway.app/api/exports/${exportItem.id}/download`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = exportItem.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

const deleteExport = async (exportItem) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet export ?')) return

  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch(`https://paloma-production.up.railway.app/api/exports/${exportItem.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      await loadExports()
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  exportForm.value = {
    type: 'pdf',
    clientId: '',
    description: '',
    config: {
      includePlans: true,
      includeMaterials: true,
      includeInterventions: true
    }
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'En attente'
    case 'processing':
      return 'En cours'
    case 'completed':
      return 'Terminé'
    case 'failed':
      return 'Échoué'
    default:
      return status
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
</script> 