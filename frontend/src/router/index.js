import { createRouter, createWebHistory } from 'vue-router'

import Home            from '@/views/Home.vue'
import About           from '@/views/About.vue'
import Equipements     from '@/views/Equipements.vue'
import Competences     from '@/views/Competences.vue'
import Services        from '@/views/Services.vue'
import Contact         from '@/views/Contact.vue'
import PalomaApps      from '@/views/PalomaApps.vue'
import MentionsLegales from '@/views/MentionsLegales.vue'
import PalomaLogin     from '@/views/PalomaLogin.vue'
import PalomaDashboard from '../views/PalomaDashboard.vue'
import PalomaPlans from '../views/PalomaPlans.vue'
import PalomaExports from '../views/PalomaExports.vue'
import PalomaPlanViewer from '../views/PalomaPlanViewer.vue'

// Composants d'authentification
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import Dashboard from '@/components/auth/Dashboard.vue'

const routes = [
  { path: '/',              name: 'Home',            component: Home },
  { path: '/about',         name: 'About',           component: About },
  { path: '/equipements',   name: 'Equipements',     component: Equipements },
  { path: '/competences',   name: 'Competences',     component: Competences },
  { path: '/services',      name: 'Services',        component: Services },
  { path: '/contact',       name: 'Contact',         component: Contact },
  { path: '/paloma-apps',   name: 'PalomaApps',      component: PalomaApps },
  { path: '/mentions-legales', name: 'MentionsLegales', component: MentionsLegales },
  
  // Routes d'authentification
  { path: '/login',         name: 'Login',           component: LoginForm },
  { path: '/register',      name: 'Register',        component: RegisterForm },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  
  // Routes PALOMA
  { path: '/paloma/login',  name: 'PalomaLogin',     component: PalomaLogin },
  { 
    path: '/paloma/dashboard', 
    name: 'PalomaDashboard', 
    component: PalomaDashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: '/paloma/plans', 
    name: 'PalomaPlans', 
    component: PalomaPlans,
    meta: { requiresAuth: true }
  },
  { 
    path: '/paloma/plans/:id',
    name: 'PalomaPlanViewer',
    component: PalomaPlanViewer,
    meta: { requiresAuth: true }
  },
  { 
    path: '/paloma/exports', 
    name: 'PalomaExports', 
    component: PalomaExports,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard pour forcer l'authentification sur tout le site
router.beforeEach(async (to, from, next) => {
  // Routes publiques (pas besoin d'authentification)
  const publicRoutes = ['/login', '/register']
  
  if (publicRoutes.includes(to.path)) {
    next()
    return
  }
  
  // Pour toutes les autres routes, vérifier l'authentification
  const authStore = await import('@/stores/authStore').then(module => module.useAuthStore())
  
  // Vérifier l'état d'authentification
  await authStore.checkAuth()
  
  if (authStore.getIsAuthenticated) {
    next()
  } else {
    // Rediriger vers la page de connexion
    next('/login')
  }
})

export default router
