<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const allApps = [
  {
    name: 'Reporting',
    icon: 'ni ni-collection',
    iconBg: 'bg-primary',
    desc: 'Outil de création pour l’expertise et la supervision.',
    url: 'http://ac-process.com'
  },
  {
    name: 'Thermique',
    icon: 'ni ni-chart-bar-32',
    iconBg: 'bg-success',
    desc: 'Calculs thermiques multi-couches & flux détaillés.',
    url: 'http://ac-process.com'
  },
  {
    name: 'Analytics',
    icon: 'ni ni-chart-pie-35',
    iconBg: 'bg-info',
    desc: 'Visualisez vos performances en temps réel.',
    url: 'http://ac-process.com'
  },
  {
    name: 'Documents',
    icon: 'ni ni-folder-17',
    iconBg: 'bg-warning',
    desc: 'Gérez vos fichiers et documents importants.',
    url: 'http://ac-process.com'
  },
  {
    name: 'Utilisateurs',
    icon: 'ni ni-single-02',
    iconBg: 'bg-danger',
    desc: 'Gérez les accès et les permissions.',
    url: 'http://ac-process.com'
  },
  {
    name: 'Base de données',
    icon: 'ni ni-archive-2',
    iconBg: 'bg-secondary',
    desc: 'Accédez à une large source de connaissance.',
    url: 'https://dbfiler.ac-process.com/'
  }
]

const apps = computed(() => {
  const role = authStore.getUser && authStore.getUser.role
  if (role === 'admin') {
    return allApps
  }
  // Pour les clients, ne montrer que Reporting et Thermique
  return allApps.filter(app => ['Reporting', 'Thermique'].includes(app.name))
})

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <section class="py-8 bg-light min-vh-100">
    <div class="container">
      <h2 class="fw-bold mb-5">Applications disponibles</h2>
      <div class="row g-4">
        <div
          v-for="app in apps"
          :key="app.name"
          class="col-12 col-sm-6 col-lg-4"
        >
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body d-flex flex-column align-items-center text-center p-4">

              <!-- Icône dans cercle coloré -->
              <div
                :class="['d-inline-flex', 'align-items-center', 'justify-content-center', 'rounded-circle', app.iconBg]"
                style="width: 72px; height: 72px;"
              >
                <i :class="[app.icon, 'text-white', 'fs-4']"></i>
              </div>

              <!-- Titre -->
              <h5 class="fw-bold mt-3">{{ app.name }}</h5>

              <!-- Description -->
              <p class="text-muted small flex-grow-1">{{ app.desc }}</p>

              <!-- Bouton -->
              <MaterialButton
                :href="app.url"
                target="_blank"
                variant="outline"
                color="primary"
                size="sm"
                class="mt-3"
              >
                Accéder
              </MaterialButton>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Élégant hover sur les cartes */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.12);
  transition: all 0.25s ease;
}
</style>
