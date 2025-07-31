<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <AppHeader />

      <!-- Dashboard Content -->
      <main class="p-6">
        <!-- Welcome Section -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Bonjour, {{ user?.fullName?.split(' ')[0] || 'Client' }} 👋</h1>
          <p class="text-gray-600">Voici l'état de vos installations industrielles</p>
        </div>

        <!-- Industrial KPIs -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-xl">🔥</span>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Fours Actifs</p>
                <p class="text-2xl font-bold text-gray-900">{{ industrialData.furnaces }}</p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-green-600">+2</span>
              <span class="text-gray-500 ml-1">ce mois</span>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-xl">🌡️</span>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Temp. Moyenne</p>
                <p class="text-2xl font-bold text-gray-900">{{ industrialData.avgTemperature }}°C</p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-green-600">Normal</span>
              <span class="text-gray-500 ml-1">• Stable</span>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-xl">⚠️</span>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Alertes</p>
                <p class="text-2xl font-bold text-gray-900">{{ industrialData.alerts }}</p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-yellow-600">2 critiques</span>
              <span class="text-gray-500 ml-1">• 3 mineures</span>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-xl">📊</span>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Efficacité</p>
                <p class="text-2xl font-bold text-gray-900">{{ industrialData.efficiency }}%</p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-green-600">+2.5%</span>
              <span class="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions & Apps -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <!-- Quick Actions -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  v-for="action in quickActions" 
                  :key="action.name"
                  @click="executeQuickAction(action)"
                  class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div class="h-10 w-10 rounded-lg flex items-center justify-center mb-2" :class="action.bgColor">
                    <span class="text-white text-lg">{{ action.icon }}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-700 group-hover:text-blue-700">{{ action.name }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
                <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm" :class="activity.bgColor">
                  {{ activity.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Furnace Status -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">État des Fours</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="furnace in furnaces" 
              :key="furnace.id"
              class="p-4 rounded-lg border" 
              :class="furnace.status === 'normal' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-900">{{ furnace.name }}</h4>
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="furnace.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ furnace.status === 'normal' ? 'Normal' : 'Alerte' }}
                </span>
              </div>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Température:</span>
                  <span class="font-medium">{{ furnace.temperature }}°C</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Dernière intervention:</span>
                  <span class="font-medium">{{ furnace.lastIntervention }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
const user = ref(null)
const showUserMenu = ref(false)
const notifications = ref([])

// Données industrielles simulées
const industrialData = ref({
  furnaces: 5,
  avgTemperature: 1250,
  alerts: 5,
  efficiency: 98.5
})

// Applications industrielles (maintenant dans AppSidebar)

// Actions rapides
const quickActions = ref([
  { name: 'Nouveau Plan', icon: '📋', bgColor: 'bg-blue-500', action: 'createPlan' },
  { name: 'Générer Rapport', icon: '📄', bgColor: 'bg-green-500', action: 'generateReport' },
  { name: 'Analyser Four', icon: '🔍', bgColor: 'bg-orange-500', action: 'analyzeFurnace' },
  { name: 'Exporter Données', icon: '📤', bgColor: 'bg-purple-500', action: 'exportData' }
])

// Activité récente
const recentActivity = ref([
  { id: 1, title: 'Intervention sur Four A-12', time: 'Il y a 2h', icon: '🔧', bgColor: 'bg-blue-500' },
  { id: 2, title: 'Rapport mensuel généré', time: 'Il y a 1j', icon: '📊', bgColor: 'bg-green-500' },
  { id: 3, title: 'Alerte température Four B-15', time: 'Il y a 3h', icon: '⚠️', bgColor: 'bg-red-500' },
  { id: 4, title: 'Nouveau matériau ajouté', time: 'Il y a 1j', icon: '🧱', bgColor: 'bg-purple-500' }
])

// Fours
const furnaces = ref([
  { id: 1, name: 'Four A-12', temperature: 1250, status: 'normal', lastIntervention: '2h' },
  { id: 2, name: 'Four B-15', temperature: 1180, status: 'alert', lastIntervention: '1j' },
  { id: 3, name: 'Four C-08', temperature: 1300, status: 'normal', lastIntervention: '3j' }
])

onMounted(async () => {
  // Charger les données utilisateur
  const userData = localStorage.getItem('paloma_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }

  // Charger les données du dashboard
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch('https://paloma-production.up.railway.app/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      // Mettre à jour les données avec les vraies données de l'API
      // industrialData.value = data.industrialData
    }
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error)
  }
}

// launchApp est maintenant dans AppSidebar

const executeQuickAction = (action) => {
  switch (action.action) {
    case 'createPlan':
      router.push('/paloma/plans')
      break
    case 'generateReport':
      router.push('/paloma/exports')
      break
    case 'analyzeFurnace':
      // Ouvrir l'analyse de four
      break
    case 'exportData':
      router.push('/paloma/exports')
      break
  }
}
</script> 