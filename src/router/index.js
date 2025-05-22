import { createRouter, createWebHistory } from 'vue-router'

import Home            from '@/views/Home.vue'
import About           from '@/views/About.vue'
import Equipements     from '@/views/Equipements.vue'
import Competences     from '@/views/Competences.vue'
import Services        from '@/views/Services.vue'
import Contact         from '@/views/Contact.vue'
import PalomaApps      from '@/views/PalomaApps.vue'
import MentionsLegales from '@/views/MentionsLegales.vue'

const routes = [
  { path: '/',              name: 'Home',            component: Home },
  { path: '/about',         name: 'About',           component: About },
  { path: '/equipements',   name: 'Equipements',     component: Equipements },
  { path: '/competences',   name: 'Competences',     component: Competences },
  { path: '/services',      name: 'Services',        component: Services },
  { path: '/contact',       name: 'Contact',         component: Contact },
  { path: '/paloma-apps',   name: 'PalomaApps',      component: PalomaApps },
  { path: '/mentions-legales', name: 'MentionsLegales', component: MentionsLegales } // ✅ Nouvelle route
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
