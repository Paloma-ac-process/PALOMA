<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">Gestion des matériaux</h2>
    <button @click="showCreate = true" class="btn-primary mb-4">Ajouter un matériau</button>
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin text-blue-600 text-2xl">⏳</span>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="material in materials" :key="material.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ material.name }}</td>
            <td class="px-4 py-2">{{ material.type }}</td>
            <td class="px-4 py-2">{{ material.planName }}</td>
            <td class="px-4 py-2 text-right">
              <button @click="editMaterial(material)" class="text-blue-600 hover:underline mr-2">Éditer</button>
              <button @click="deleteMaterial(material.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal d'édition -->
    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Éditer le matériau</h3>
        <input v-model="editForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !editForm.name }" />
        <input v-model="editForm.type" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Type" :class="{ 'border-red-500': !editForm.type }" />
        <div class="flex justify-end gap-2">
          <button @click="showEdit = false" class="btn-secondary">Annuler</button>
          <button @click="saveEdit" :disabled="!isEditFormValid()" class="btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
    <!-- Modal de création -->
    <div v-if="showCreate" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Nouveau matériau</h3>
        <input v-model="createForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !createForm.name }" />
        <input v-model="createForm.type" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Type" :class="{ 'border-red-500': !createForm.type }" />
        <div class="flex justify-end gap-2">
          <button @click="showCreate = false" class="btn-secondary">Annuler</button>
          <button @click="createMaterial" :disabled="!isCreateFormValid()" class="btn-primary">Créer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const materials = ref([])
const loading = ref(false)
const showEdit = ref(false)
const showCreate = ref(false)
const editForm = ref({ id: null, name: '', type: '' })
const createForm = ref({ name: '', type: '' })
const toast = useToast()

async function fetchMaterials() {
  loading.value = true
  try {
    materials.value = await api.getMaterials()
  } finally {
    loading.value = false
  }
}
onMounted(fetchMaterials)

function editMaterial(material) {
  editForm.value = { ...material }
  showEdit.value = true
}
async function saveEdit() {
  if (!isEditFormValid()) return
  try {
    await api.updateMaterial(editForm.value.id, editForm.value)
    await fetchMaterials()
    toast.success('Modification enregistrée !')
    showEdit.value = false
  } catch (e) {
    toast.error('Erreur lors de la modification')
  }
}
async function deleteMaterial(id) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await api.deleteMaterial(id)
    await fetchMaterials()
    toast.success('Suppression réussie !')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  }
}
function isEditFormValid() {
  return !!editForm.value.name && !!editForm.value.type
}
function isCreateFormValid() {
  return !!createForm.value.name && !!createForm.value.type
}
async function createMaterial() {
  if (!isCreateFormValid()) return
  try {
    await api.createMaterial(createForm.value)
    await fetchMaterials()
    toast.success('Matériau créé !')
    showCreate.value = false
    createForm.value = { name: '', type: '' }
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