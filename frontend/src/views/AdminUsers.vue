<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">Gestion des utilisateurs</h2>
    <button @click="showCreate = true" class="btn-primary mb-4">Ajouter un utilisateur</button>
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin text-blue-600 text-2xl">⏳</span>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom complet</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date création</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ user.fullName || 'Non renseigné' }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">
              <span :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 rounded text-xs">
                {{ user.role }}
              </span>
            </td>
            <td class="px-4 py-2">
              <span :class="user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 py-1 rounded text-xs">
                {{ user.isVerified ? 'Vérifié' : 'En attente' }}
              </span>
            </td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
            <td class="px-4 py-2 text-right">
              <button @click="editUser(user)" class="text-blue-600 hover:underline mr-2">Éditer</button>
              <button @click="deleteUser(user.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal d'édition -->
    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Éditer l'utilisateur</h3>
        <input v-model="editForm.fullName" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom complet" />
        <input v-model="editForm.email" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Email" :class="{ 'border-red-500': !editForm.email }" />
        <select v-model="editForm.role" class="border rounded px-3 py-2 mb-2 w-full" :class="{ 'border-red-500': !editForm.role }">
          <option value="client">Client</option>
          <option value="admin">Administrateur</option>
        </select>
        <div class="flex items-center mb-4">
          <input v-model="editForm.isVerified" type="checkbox" id="isVerified" class="mr-2" />
          <label for="isVerified" class="text-sm">Compte vérifié</label>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="showEdit = false" class="btn-secondary">Annuler</button>
          <button @click="saveEdit" :disabled="!isEditFormValid()" class="btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
    <!-- Modal de création -->
    <div v-if="showCreate" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Nouvel utilisateur</h3>
        <input v-model="createForm.fullName" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Nom complet" />
        <input v-model="createForm.email" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Email" :class="{ 'border-red-500': !createForm.email }" />
        <input v-model="createForm.password" type="password" class="border rounded px-3 py-2 mb-2 w-full" placeholder="Mot de passe" :class="{ 'border-red-500': !createForm.password }" />
        <select v-model="createForm.role" class="border rounded px-3 py-2 mb-4 w-full" :class="{ 'border-red-500': !createForm.role }">
          <option value="client">Client</option>
          <option value="admin">Administrateur</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="showCreate = false" class="btn-secondary">Annuler</button>
          <button @click="createUser" :disabled="!isCreateFormValid()" class="btn-primary">Créer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const users = ref([])
const loading = ref(false)
const showEdit = ref(false)
const showCreate = ref(false)
const editForm = ref({ id: null, fullName: '', email: '', role: 'client', isVerified: false })
const createForm = ref({ fullName: '', email: '', password: '', role: 'client' })
const toast = useToast()

async function fetchUsers() {
  loading.value = true
  try {
    const response = await api.getUsers()
    users.value = response.users || response.data || []
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
    toast.error('Erreur lors du chargement des utilisateurs')
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

function editUser(user) {
  editForm.value = { 
    id: user.id, 
    fullName: user.fullName || '', 
    email: user.email, 
    role: user.role,
    isVerified: user.isVerified
  }
  showEdit.value = true
}

async function saveEdit() {
  if (!isEditFormValid()) return
  try {
    await api.updateUser(editForm.value.id, editForm.value)
    await fetchUsers()
    toast.success('Utilisateur modifié avec succès !')
    showEdit.value = false
  } catch (e) {
    toast.error('Erreur lors de la modification')
  }
}

async function deleteUser(id) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await api.deleteUser(id)
    await fetchUsers()
    toast.success('Utilisateur supprimé !')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  }
}

function isEditFormValid() {
  return !!editForm.value.email && !!editForm.value.role
}

function isCreateFormValid() {
  return !!createForm.value.email && !!createForm.value.password && !!createForm.value.role
}

async function createUser() {
  if (!isCreateFormValid()) return
  try {
    await api.createUser(createForm.value)
    await fetchUsers()
    toast.success('Utilisateur créé !')
    showCreate.value = false
    createForm.value = { fullName: '', email: '', password: '', role: 'client' }
  } catch (e) {
    toast.error('Erreur lors de la création')
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
table { @apply w-full; }
th, td { @apply border-b border-gray-200; }
.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
.btn-secondary { @apply bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition; }
</style> 