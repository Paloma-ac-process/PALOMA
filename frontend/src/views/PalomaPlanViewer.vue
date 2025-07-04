<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <!-- <PalomaHeader /> -->

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/paloma/plans" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
              </svg>
              Plans
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ plan?.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Plan Info -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ plan?.name }}</h1>
              <p class="mt-1 text-sm text-gray-500">{{ plan?.client?.name }}</p>
              <p class="mt-2 text-gray-700">{{ plan?.description }}</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="showExportModal = true"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Exporter
              </button>
              <button 
                @click="editPlan"
                class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
              </button>
            </div>
          </div>

          <!-- Metadata -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-gray-500">Type</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ plan?.type }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-gray-500">Dimensions</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ plan?.metadata?.dimensions || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-gray-500">Capacité</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ plan?.metadata?.capacity || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan Viewer -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Layers Panel -->
          <div class="bg-white shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Calques</h3>
              <div class="space-y-3">
                <div v-for="layer in layers" :key="layer.id" class="flex items-center">
                  <input 
                    :id="`layer-${layer.id}`"
                    v-model="layer.visible"
                    type="checkbox"
                    @change="toggleLayer(layer)"
                    class="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  >
                  <label :for="`layer-${layer.id}`" class="ml-2 text-sm text-gray-700">
                    {{ layer.name }}
                  </label>
                  <div 
                    class="ml-auto w-4 h-4 rounded"
                    :style="{ backgroundColor: layer.color }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Materials Panel -->
          <div class="bg-white shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Matériaux</h3>
              <div class="space-y-3">
                <div v-for="material in materials" :key="material.id" class="border-l-4 border-blue-500 pl-3">
                  <h4 class="text-sm font-medium text-gray-900">{{ material.name }}</h4>
                  <p class="text-xs text-gray-500">{{ material.quantity }} {{ material.unit }}</p>
                  <p class="text-xs text-gray-500">{{ material.type }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Interventions Panel -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Interventions</h3>
              <div class="space-y-3">
                <div v-for="intervention in interventions" :key="intervention.id" class="border-l-4 border-yellow-500 pl-3">
                  <h4 class="text-sm font-medium text-gray-900">{{ intervention.title }}</h4>
                  <p class="text-xs text-gray-500">{{ intervention.type }}</p>
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                    :class="getInterventionStatusClass(intervention.status)"
                  >
                    {{ getInterventionStatusText(intervention.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Plan Viewer -->
        <div class="lg:col-span-3">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Visualisation du plan</h3>
                <div class="flex space-x-2">
                  <button 
                    @click="zoomIn"
                    class="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                  </button>
                  <button 
                    @click="zoomOut"
                    class="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                    </svg>
                  </button>
                  <button 
                    @click="resetZoom"
                    class="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Plan Canvas -->
              <div class="border-2 border-gray-200 rounded-lg h-96 bg-gray-50 flex items-center justify-center">
                <div v-if="plan?.filePath" class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Plan: {{ plan.filePath }}</p>
                  <button 
                    @click="downloadPlan"
                    class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Télécharger le plan
                  </button>
                </div>
                <div v-else class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Aucun fichier de plan disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Exporter le plan</h3>
          
          <form @submit.prevent="exportPlan">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Format</label>
                <select v-model="exportForm.type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Inclure</label>
                <div class="mt-2 space-y-2">
                  <label class="flex items-center">
                    <input v-model="exportForm.includeLayers" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Calques</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="exportForm.includeMaterials" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Matériaux</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="exportForm.includeInterventions" type="checkbox" class="h-4 w-4 text-primary-600 border-gray-300 rounded">
                    <span class="ml-2 text-sm text-gray-700">Interventions</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 flex space-x-3">
              <button 
                type="submit"
                class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Exporter
              </button>
              <button 
                type="button"
                @click="showExportModal = false"
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
import { useRoute, useRouter } from 'vue-router'
import apiService from '@/services/api.js'

const route = useRoute()
const router = useRouter()

const plan = ref(null)
const layers = ref([])
const materials = ref([])
const interventions = ref([])
const showExportModal = ref(false)

const exportForm = ref({
  type: 'pdf',
  includeLayers: true,
  includeMaterials: true,
  includeInterventions: true
})

onMounted(async () => {
  const planId = route.params.id
  await loadPlanData(planId)
})

const loadPlanData = async (planId) => {
  try {
    const [planData, layersData, materialsData, interventionsData] = await Promise.all([
      apiService.getPlan(planId),
      apiService.getPlanLayers(planId),
      apiService.getMaterials(planId),
      apiService.getInterventions(planId)
    ])

    plan.value = planData.data
    layers.value = layersData.data
    materials.value = materialsData.data
    interventions.value = interventionsData.data
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

const toggleLayer = async (layer) => {
  try {
    await apiService.updatePlanLayer(layer.id, { visible: layer.visible })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du calque:', error)
  }
}

const editPlan = () => {
  router.push(`/paloma/plans/${plan.value.id}/edit`)
}

const downloadPlan = () => {
  if (plan.value?.filePath) {
    // Logique de téléchargement du fichier
    console.log('Téléchargement du plan:', plan.value.filePath)
  }
}

const exportPlan = async () => {
  try {
    const exportData = {
      planId: plan.value.id,
      type: exportForm.value.type,
      config: {
        includeLayers: exportForm.value.includeLayers,
        includeMaterials: exportForm.value.includeMaterials,
        includeInterventions: exportForm.value.includeInterventions
      }
    }

    await apiService.createExport(exportData)
    showExportModal.value = false
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
  }
}

const zoomIn = () => {
  // Logique de zoom
  console.log('Zoom in')
}

const zoomOut = () => {
  // Logique de zoom
  console.log('Zoom out')
}

const resetZoom = () => {
  // Logique de reset zoom
  console.log('Reset zoom')
}

const getInterventionStatusClass = (status) => {
  switch (status) {
    case 'planned':
      return 'bg-blue-100 text-blue-800'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getInterventionStatusText = (status) => {
  switch (status) {
    case 'planned':
      return 'Planifiée'
    case 'in_progress':
      return 'En cours'
    case 'completed':
      return 'Terminée'
    case 'cancelled':
      return 'Annulée'
    default:
      return status
  }
}
</script> 