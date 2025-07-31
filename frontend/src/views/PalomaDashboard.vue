<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white shadow-lg fixed h-full z-30">
      <div class="p-6">
        <!-- Logo -->
        <div class="flex items-center mb-8">
          <div class="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="ml-3 text-xl font-bold text-gray-900">PALOMA</h1>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <router-link 
            to="/paloma/dashboard" 
            class="flex items-center px-4 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-500 rounded-lg"
          >
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            Dashboard
          </router-link>
          
          <router-link 
            to="/paloma/plans" 
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Plans
          </router-link>
          
          <router-link 
            to="/paloma/exports" 
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Exports
          </router-link>
        </nav>

        <!-- Applications -->
        <div class="mt-8">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Applications</h3>
          <div class="space-y-2">
            <button 
              v-for="app in industrialApps" 
              :key="app.name"
              @click="launchApp(app)"
              class="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group"
            >
              <div class="h-8 w-8 rounded-lg flex items-center justify-center mr-3" :class="app.bgColor">
                <span class="text-white text-sm">{{ app.icon }}</span>
              </div>
              <div class="flex-1 text-left">
                <div class="font-medium">{{ app.name }}</div>
                <div class="text-xs text-gray-500">{{ app.status }}</div>
              </div>
              <svg class="h-4 w-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="px-6 py-4">
          <div class="flex justify-between items-center">
            <!-- Breadcrumb -->
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <span>🏠</span>
              <span>/</span>
              <span class="text-gray-900 font-medium">Dashboard</span>
            </div>

            <!-- User Menu -->
            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <button class="relative p-2 text-gray-400 hover:text-gray-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z"></path>
                </svg>
                <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ notifications.length }}
                </span>
              </button>

              <!-- User Profile -->
              <div class="flex items-center space-x-3">
                <div class="text-right">
                  <div class="text-sm font-medium text-gray-900">{{ user?.fullName || user?.email }}</div>
                  <div class="text-xs text-gray-500">{{ user?.role }}</div>
                </div>
                <div class="relative" data-user-menu>
                  <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {{ user?.fullName?.charAt(0) || user?.email?.charAt(0) }}
                    </div>
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div class="px-4 py-2 border-b border-gray-100">
                      <div class="text-sm font-medium text-gray-900">{{ user?.fullName || user?.email }}</div>
                      <div class="text-xs text-gray-500">{{ user?.role }}</div>
                    </div>
                    <button @click="goToProfile" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <svg class="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Mon Profil
                    </button>
                    <button @click="goToSettings" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <svg class="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Paramètres
                    </button>
                    <div class="border-t border-gray-100 my-1"></div>
                    <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <svg class="inline h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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

// Applications industrielles
const industrialApps = ref([
  {
    name: 'Jumeau Numérique',
    icon: '🔬',
    bgColor: 'bg-blue-500',
    status: 'Disponible',
    url: '/apps/digital-twin'
  },
  {
    name: 'Reporting',
    icon: '📊',
    bgColor: 'bg-green-500',
    status: 'Disponible',
    url: '/apps/reporting'
  },
  {
    name: 'Calculs Thermiques',
    icon: '🌡️',
    bgColor: 'bg-orange-500',
    status: 'Disponible',
    url: '/apps/thermal'
  },
  {
    name: 'DAO',
    icon: '✏️',
    bgColor: 'bg-purple-500',
    status: 'Maintenance',
    url: '/apps/cad'
  },
  {
    name: 'CFD',
    icon: '🌊',
    bgColor: 'bg-cyan-500',
    status: 'Disponible',
    url: '/apps/cfd'
  }
])

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

  // Fermer le menu utilisateur si on clique ailleurs
  document.addEventListener('click', (event) => {
    const userMenu = document.querySelector('[data-user-menu]')
    if (userMenu && !userMenu.contains(event.target)) {
      showUserMenu.value = false
    }
  })
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

const launchApp = (app) => {
  if (app.status === 'Disponible') {
    // Ouvrir l'application
    window.open(app.url, '_blank')
  } else {
    alert(`${app.name} est actuellement en maintenance`)
  }
}

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

// Fonctions pour le menu utilisateur
const goToProfile = () => {
  showUserMenu.value = false
  // router.push('/paloma/profile')
  alert('Page profil à implémenter')
}

const goToSettings = () => {
  showUserMenu.value = false
  // router.push('/paloma/settings')
  alert('Page paramètres à implémenter')
}

const logout = () => {
  showUserMenu.value = false
  localStorage.removeItem('paloma_token')
  localStorage.removeItem('paloma_user')
  router.push('/paloma/login')
}

// Fermer le menu si on clique ailleurs
const closeUserMenu = () => {
  showUserMenu.value = false
}
</script> 