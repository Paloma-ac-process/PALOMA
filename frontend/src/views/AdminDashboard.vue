<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6 text-blue-600">Administration</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <router-link to="/admin/users" class="admin-card">
        <div class="icon bg-blue-100 text-blue-600"><i class="fas fa-users fa-2x"></i></div>
        <div class="label">Utilisateurs</div>
      </router-link>
      <router-link to="/admin/clients" class="admin-card">
        <div class="icon bg-green-100 text-green-600"><i class="fas fa-building fa-2x"></i></div>
        <div class="label">Clients</div>
      </router-link>
      <router-link to="/admin/plans" class="admin-card">
        <div class="icon bg-yellow-100 text-yellow-600"><i class="fas fa-map fa-2x"></i></div>
        <div class="label">Plans</div>
      </router-link>
      <router-link to="/admin/exports" class="admin-card">
        <div class="icon bg-purple-100 text-purple-600"><i class="fas fa-file-export fa-2x"></i></div>
        <div class="label">Exports</div>
      </router-link>
    </div>
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Tableau de bord global</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stat-card">
          <div class="stat-label">Utilisateurs</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Clients</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Plans</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Exports</div>
          <div class="stat-value">--</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Ici tu pourras importer les services API pour charger les stats globales
</script>

<style scoped>
.admin-card {
  @apply flex flex-col items-center justify-center bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer text-center;
}
.admin-card .icon {
  @apply w-16 h-16 flex items-center justify-center rounded-full mb-3 text-3xl;
}
.admin-card .label {
  @apply font-semibold text-lg;
}
.stat-card {
  @apply bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow;
}
.stat-label {
  @apply text-gray-500 text-sm mb-1;
}
.stat-value {
  @apply text-2xl font-bold text-blue-600;
}
</style> 