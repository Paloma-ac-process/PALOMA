<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">Gestion des clients</h2>
    <button @click="showCreate = true" class="btn-primary mb-4">Ajouter un client</button>
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin text-blue-600 text-2xl">⏳</span>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ client.name }}</td>
            <td class="px-4 py-2">{{ client.email }}</td>
            <td class="px-4 py-2">{{ client.phone }}</td>
            <td class="px-4 py-2 text-right">
              <button @click="editClient(client)" class="text-blue-600 hover:underline mr-2">Éditer</button>
              <button @click="deleteClient(client.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal d'édition -->
    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Éditer le client</h3>
        <input v-model="editForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !editForm.name }" />
        <input v-model="editForm.email" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Email" :class="{ 'border-red-500': !editForm.email }" />
        <input v-model="editForm.phone" class="border rounded px-3 py-2 mb-4 w-full" placeholder="Téléphone" />
        <div class="flex justify-end gap-2">
          <button @click="showEdit = false" class="btn-secondary">Annuler</button>
          <button @click="saveEdit" :disabled="!isEditFormValid()" class="btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
    <!-- Modal de création -->
    <div v-if="showCreate" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Nouveau client</h3>
        <input v-model="createForm.name" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom" :class="{ 'border-red-500': !createForm.name }" />
        <input v-model="createForm.email" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Email" :class="{ 'border-red-500': !createForm.email }" />
        <input v-model="createForm.phone" class="border rounded px-3 py-2 mb-4 w-full" placeholder="Téléphone" />
        <div class="flex justify-end gap-2">
          <button @click="showCreate = false" class="btn-secondary">Annuler</button>
          <button @click="createClient" :disabled="!isCreateFormValid()" class="btn-primary">Créer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const clients = ref([])
const loading = ref(false)
const showEdit = ref(false)
const showCreate = ref(false)
const editForm = ref({ id: null, name: '', email: '', phone: '' })
const createForm = ref({ name: '', email: '', phone: '' })
const toast = useToast()

async function fetchClients() {
  loading.value = true
  try {
    clients.value = await api.getClients()
  } finally {
    loading.value = false
  }
}
onMounted(fetchClients)

function editClient(client) {
  editForm.value = { ...client }
  showEdit.value = true
}
async function saveEdit() {
  if (!isEditFormValid()) return
  try {
    await api.updateClient(editForm.value.id, editForm.value)
    await fetchClients()
    toast.success('Modification enregistrée !')
    showEdit.value = false
  } catch (e) {
    toast.error('Erreur lors de la modification')
  }
}
async function deleteClient(id) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await api.deleteClient(id)
    await fetchClients()
    toast.success('Client supprimé !')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  }
}
function isEditFormValid() {
  return !!editForm.value.name && !!editForm.value.email
}
function isCreateFormValid() {
  return !!createForm.value.name && !!createForm.value.email
}
async function createClient() {
  if (!isCreateFormValid()) return
  try {
    await api.createClient(createForm.value)
    await fetchClients()
    toast.success('Client créé !')
    showCreate.value = false
    createForm.value = { name: '', email: '', phone: '' }
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