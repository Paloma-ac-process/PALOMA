<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">Gestion des plans</h2>
    <button @click="showCreate = true" class="btn-primary mb-4">Ajouter un plan</button>
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin text-blue-600 text-2xl">⏳</span>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in plans" :key="plan.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ plan.name }}</td>
            <td class="px-4 py-2">{{ plan.description }}</td>
            <td class="px-4 py-2">
              <span :class="plan.status === 'approved' ? 'bg-green-100 text-green-800' : plan.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded text-xs">
                {{ plan.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ plan.clientName }}</td>
            <td class="px-4 py-2 text-right">
              <button @click="editPlan(plan)" class="text-blue-600 hover:underline mr-2">Éditer</button>
              <button @click="deletePlan(plan.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal d'édition -->
    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Éditer le plan</h3>
        <input v-model="editForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !editForm.name }" />
        <textarea v-model="editForm.description" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Description" :class="{ 'border-red-500': !editForm.description }" rows="3"></textarea>
        <select v-model="editForm.status" class="border rounded px-3 py-2 mb-4 w-full">
          <option value="draft">Brouillon</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="showEdit = false" class="btn-secondary">Annuler</button>
          <button @click="saveEdit" :disabled="!isEditFormValid()" class="btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
    <!-- Modal de création -->
    <div v-if="showCreate" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Nouveau plan</h3>
        <input v-model="createForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !createForm.name }" />
        <textarea v-model="createForm.description" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Description" :class="{ 'border-red-500': !createForm.description }" rows="3"></textarea>
        <select v-model="createForm.status" class="border rounded px-3 py-2 mb-4 w-full">
          <option value="draft">Brouillon</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="showCreate = false" class="btn-secondary">Annuler</button>
          <button @click="createPlan" :disabled="!isCreateFormValid()" class="btn-primary">Créer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const plans = ref([])
const loading = ref(false)
const showEdit = ref(false)
const showCreate = ref(false)
const editForm = ref({ id: null, name: '', description: '', status: 'draft' })
const createForm = ref({ name: '', description: '', status: 'draft' })
const toast = useToast()

async function fetchPlans() {
  loading.value = true
  try {
    plans.value = await api.getPlans()
  } finally {
    loading.value = false
  }
}
onMounted(fetchPlans)

function editPlan(plan) {
  editForm.value = { ...plan }
  showEdit.value = true
}
async function saveEdit() {
  if (!isEditFormValid()) return
  try {
    await api.updatePlan(editForm.value.id, editForm.value)
    await fetchPlans()
    toast.success('Modification enregistrée !')
    showEdit.value = false
  } catch (e) {
    toast.error('Erreur lors de la modification')
  }
}
async function deletePlan(id) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await api.deletePlan(id)
    await fetchPlans()
    toast.success('Plan supprimé !')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  }
}
function isEditFormValid() {
  return !!editForm.value.name && !!editForm.value.description
}
function isCreateFormValid() {
  return !!createForm.value.name && !!createForm.value.description
}
async function createPlan() {
  if (!isCreateFormValid()) return
  try {
    await api.createPlan(createForm.value)
    await fetchPlans()
    toast.success('Plan créé !')
    showCreate.value = false
    createForm.value = { name: '', description: '', status: 'draft' }
  } catch (e) {
    toast.error('Erreur lors de la création')
  }
}
</script>

<style scoped>
table { @apply w-full; }
th, td { @apply border-b border-gray-200; }
.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
.btn-secondary { @apply bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition; }
</style> 