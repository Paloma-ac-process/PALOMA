<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">Gestion des exports</h2>
    <button @click="showCreate = true" class="btn-primary mb-4">Ajouter un export</button>
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin text-blue-600 text-2xl">⏳</span>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exportItem in exports" :key="exportItem.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ exportItem.type }}</td>
            <td class="px-4 py-2">{{ exportItem.format }}</td>
            <td class="px-4 py-2">
              <span :class="exportItem.status === 'completed' ? 'bg-green-100 text-green-800' : exportItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded text-xs">
                {{ exportItem.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ exportItem.createdAt }}</td>
            <td class="px-4 py-2 text-right">
              <button @click="editExport(exportItem)" class="text-blue-600 hover:underline mr-2">Éditer</button>
              <button @click="deleteExport(exportItem.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal d'édition -->
    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Éditer l'export</h3>
        <input v-model="editForm.type" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Type" :class="{ 'border-red-500': !editForm.type }" />
        <select v-model="editForm.format" class="border rounded px-3 py-2 mb-2 w-full" :class="{ 'border-red-500': !editForm.format }">
          <option value="">Sélectionner un format</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
        <select v-model="editForm.status" class="border rounded px-3 py-2 mb-4 w-full">
          <option value="pending">En attente</option>
          <option value="processing">En cours</option>
          <option value="completed">Terminé</option>
          <option value="failed">Échoué</option>
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
        <h3 class="text-lg font-bold mb-4">Nouvel export</h3>
        <input v-model="createForm.type" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Type" :class="{ 'border-red-500': !createForm.type }" />
        <select v-model="createForm.format" class="border rounded px-3 py-2 mb-2 w-full" :class="{ 'border-red-500': !createForm.format }">
          <option value="">Sélectionner un format</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
        <select v-model="createForm.status" class="border rounded px-3 py-2 mb-4 w-full">
          <option value="pending">En attente</option>
          <option value="processing">En cours</option>
          <option value="completed">Terminé</option>
          <option value="failed">Échoué</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="showCreate = false" class="btn-secondary">Annuler</button>
          <button @click="createExport" :disabled="!isCreateFormValid()" class="btn-primary">Créer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const exports = ref([])
const loading = ref(false)
const showEdit = ref(false)
const showCreate = ref(false)
const editForm = ref({ id: null, type: '', format: '', status: 'pending' })
const createForm = ref({ type: '', format: '', status: 'pending' })
const toast = useToast()

async function fetchExports() {
  loading.value = true
  try {
    exports.value = await api.getExports()
  } finally {
    loading.value = false
  }
}
onMounted(fetchExports)

function editExport(exportItem) {
  editForm.value = { ...exportItem }
  showEdit.value = true
}
async function saveEdit() {
  if (!isEditFormValid()) return
  try {
    await api.updateExport(editForm.value.id, editForm.value)
    await fetchExports()
    toast.success('Modification enregistrée !')
    showEdit.value = false
  } catch (e) {
    toast.error('Erreur lors de la modification')
  }
}
async function deleteExport(id) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await api.deleteExport(id)
    await fetchExports()
    toast.success('Export supprimé !')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  }
}
function isEditFormValid() {
  return !!editForm.value.type && !!editForm.value.format
}
function isCreateFormValid() {
  return !!createForm.value.type && !!createForm.value.format
}
async function createExport() {
  if (!isCreateFormValid()) return
  try {
    await api.createExport(createForm.value)
    await fetchExports()
    toast.success('Export créé !')
    showCreate.value = false
    createForm.value = { type: '', format: '', status: 'pending' }
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