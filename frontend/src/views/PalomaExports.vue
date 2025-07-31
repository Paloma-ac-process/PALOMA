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
        <!-- Header avec bouton nouveau -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Exports</h1>
              <p class="text-gray-600 mt-1">Gérez vos exports et rapports générés</p>
            </div>
            <button 
              @click="showCreateModal = true"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center shadow-lg hover:shadow-xl transition-all"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Nouvel export
            </button>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Exports</p>
                <p class="text-2xl font-bold text-gray-900">{{ exports.length }}</p>
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
                <p class="text-sm font-medium text-gray-600">Complétés</p>
                <p class="text-2xl font-bold text-gray-900">{{ completedExportsCount }}</p>
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
                <p class="text-sm font-medium text-gray-600">En cours</p>
                <p class="text-2xl font-bold text-gray-900">{{ pendingExportsCount }}</p>
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
                <p class="text-sm font-medium text-gray-600">Taille totale</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalSize }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtres -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select v-model="filters.type" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tous les types</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select v-model="filters.status" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tous</option>
                <option value="completed">Complété</option>
                <option value="pending">En cours</option>
                <option value="failed">Échoué</option>
              </select>
            </div>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <div class="relative">
                <input 
                  v-model="filters.search" 
                  type="text" 
                  placeholder="Nom du fichier..."
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10"
                >
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des exports -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Liste des exports</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichier</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="exportItem in filteredExports" :key="exportItem.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-lg flex items-center justify-center mr-3" :class="getFileTypeColor(exportItem.type)">
                        <svg v-if="exportItem.type === 'pdf'" class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                        </svg>
                        <svg v-else-if="exportItem.type === 'excel'" class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <svg v-else class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ exportItem.fileName }}</div>
                        <div class="text-sm text-gray-500">{{ exportItem.description || 'Aucune description' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getTypeBadgeColor(exportItem.type)">
                      {{ exportItem.type?.toUpperCase() || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ exportItem.client?.name || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeColor(exportItem.status)">
                      {{ getStatusText(exportItem.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatFileSize(exportItem.fileSize) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(exportItem.createdAt) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        v-if="exportItem.status === 'completed'"
                        @click="downloadExport(exportItem)"
                        class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                      >
                        Télécharger
                      </button>
                      <button 
                        @click="deleteExport(exportItem)"
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

          <!-- Message si aucun export -->
          <div v-if="filteredExports.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun export trouvé</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par créer un nouvel export.</p>
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
const exports = ref([])
const clients = ref([])
const showCreateModal = ref(false)
const filters = ref({
  type: '',
  status: '',
  clientId: '',
  search: ''
})

// Computed properties pour les statistiques
const filteredExports = computed(() => {
  let filtered = exports.value

  if (filters.value.type) {
    filtered = filtered.filter(exp => exp.type === filters.value.type)
  }
  if (filters.value.status) {
    filtered = filtered.filter(exp => exp.status === filters.value.status)
  }
  if (filters.value.clientId) {
    filtered = filtered.filter(exp => exp.clientId == filters.value.clientId)
  }
  if (filters.value.search) {
    filtered = filtered.filter(exp => 
      exp.fileName.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }

  return filtered
})

const completedExportsCount = computed(() => {
  return exports.value.filter(exp => exp.status === 'completed').length
})

const pendingExportsCount = computed(() => {
  return exports.value.filter(exp => exp.status === 'pending').length
})

const totalSize = computed(() => {
  const totalBytes = exports.value.reduce((total, exp) => total + (exp.fileSize || 0), 0)
  return formatFileSize(totalBytes)
})

onMounted(async () => {
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
      exports.value = data.data || []
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
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileTypeColor = (type) => {
  switch (type) {
    case 'pdf':
      return 'bg-red-500'
    case 'excel':
      return 'bg-green-500'
    case 'csv':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

const getTypeBadgeColor = (type) => {
  switch (type) {
    case 'pdf':
      return 'bg-red-100 text-red-800'
    case 'excel':
      return 'bg-green-100 text-green-800'
    case 'csv':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Complété'
    case 'pending':
      return 'En cours'
    case 'failed':
      return 'Échoué'
    default:
      return 'Inconnu'
  }
}

const downloadExport = (exportItem) => {
  // Logique de téléchargement
  console.log('Télécharger:', exportItem)
  // window.open(exportItem.downloadUrl, '_blank')
}

const deleteExport = async (exportItem) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'export "${exportItem.fileName}" ?`)) {
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
}
</script> 