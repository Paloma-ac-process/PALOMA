import { createRouter, createWebHistory } from 'vue-router'

import PalomaApps      from '@/views/PalomaApps.vue'
import PalomaLogin     from '@/views/PalomaLogin.vue'
import PalomaDashboard from '../views/PalomaDashboard.vue'
import PalomaPlans from '../views/PalomaPlans.vue'
import PalomaExports from '../views/PalomaExports.vue'
import PalomaPlanViewer from '../views/PalomaPlanViewer.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import AdminUsers from '@/views/AdminUsers.vue'
import AdminClients from '@/views/AdminClients.vue'
import AdminPlans from '@/views/AdminPlans.vue'
import AdminExports from '@/views/AdminExports.vue'
import AdminInterventions from '@/views/AdminInterventions.vue'
import AdminMaterials from '@/views/AdminMaterials.vue'

const routes = [
  { path: '/', redirect: '/paloma-apps' },
  { path: '/paloma-apps', name: 'PalomaApps', component: PalomaApps },
  { path: '/login', name: 'Login', component: PalomaLogin },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },
  { path: '/paloma/login', name: 'PalomaLogin', component: PalomaLogin },
  { path: '/paloma/dashboard', name: 'PalomaDashboard', component: PalomaDashboard, meta: { requiresAuth: true } },
  { path: '/paloma/plans', name: 'PalomaPlans', component: PalomaPlans, meta: { requiresAuth: true } },
  { path: '/paloma/plans/:id', name: 'PalomaPlanViewer', component: PalomaPlanViewer, meta: { requiresAuth: true } },
  { path: '/paloma/exports', name: 'PalomaExports', component: PalomaExports, meta: { requiresAuth: true } },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/users', name: 'AdminUsers', component: AdminUsers, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/clients', name: 'AdminClients', component: AdminClients, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/plans', name: 'AdminPlans', component: AdminPlans, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/exports', name: 'AdminExports', component: AdminExports, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/interventions', name: 'AdminInterventions', component: AdminInterventions, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/admin/materials', name: 'AdminMaterials', component: AdminMaterials, meta: { requiresAuth: true, requiresRole: 'admin' } },
  { path: '/forgot-password', name: 'ForgotPassword', component: () => import('@/views/ForgotPassword.vue') },
  { path: '/reset-password', name: 'ResetPassword', component: () => import('@/views/ResetPassword.vue') },
  { path: '/activate-account', name: 'ActivateAccount', component: () => import('@/views/ActivateAccount.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard pour forcer l'authentification et le rôle sur tout le site
router.beforeEach(async (to, from, next) => {
  const publicRoutes = ['/login', '/register', '/forgot-password']
  if (publicRoutes.includes(to.path)) {
    next()
    return
  }
  const authStore = await import('@/stores/authStore').then(module => module.useAuthStore())
  await authStore.checkAuth()
  if (!authStore.getIsAuthenticated) {
    next('/login')
    return
  }
  // Protection par rôle
  if (to.meta.requiresRole && authStore.getUser?.role !== to.meta.requiresRole) {
    next('/paloma/dashboard') // Redirige vers le dashboard si pas le bon rôle
    return
  }
  next()
})

export default router
