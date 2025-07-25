import { getApiUrl } from '../config/api.js'

async function handleResponse(res) {
  if (!res.ok) throw new Error(await res.text() || 'Erreur API')
  return await res.json()
}

export default {
  // Utilisateurs
  async getUsers() {
    const res = await fetch(getApiUrl('/api/users'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updateUser(id, data) {
    const res = await fetch(getApiUrl(`/api/users/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async updateUserRole(id, role) {
    const res = await fetch(getApiUrl(`/api/users/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ role })
    })
    return handleResponse(res)
  },
  async deleteUser(id) {
    const res = await fetch(getApiUrl(`/api/users/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createUser(data) {
    const res = await fetch(getApiUrl('/api/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Clients
  async getClients() {
    const res = await fetch(getApiUrl('/api/clients'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updateClient(id, data) {
    const res = await fetch(getApiUrl(`/api/clients/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteClient(id) {
    const res = await fetch(getApiUrl(`/api/clients/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createClient(data) {
    const res = await fetch(getApiUrl('/api/clients'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Plans
  async getPlans() {
    const res = await fetch(getApiUrl('/api/plans'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updatePlan(id, data) {
    const res = await fetch(getApiUrl(`/api/plans/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deletePlan(id) {
    const res = await fetch(getApiUrl(`/api/plans/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createPlan(data) {
    const res = await fetch(getApiUrl('/api/plans'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Exports
  async getExports() {
    const res = await fetch(getApiUrl('/api/exports'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updateExport(id, data) {
    const res = await fetch(getApiUrl(`/api/exports/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteExport(id) {
    const res = await fetch(getApiUrl(`/api/exports/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createExport(data) {
    const res = await fetch(getApiUrl('/api/exports'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Interventions
  async getInterventions() {
    const res = await fetch(getApiUrl('/api/interventions'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updateIntervention(id, data) {
    const res = await fetch(getApiUrl(`/api/interventions/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteIntervention(id) {
    const res = await fetch(getApiUrl(`/api/interventions/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createIntervention(data) {
    const res = await fetch(getApiUrl('/api/interventions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Materials
  async getMaterials() {
    const res = await fetch(getApiUrl('/api/materials'), {
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async updateMaterial(id, data) {
    const res = await fetch(getApiUrl(`/api/materials/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteMaterial(id) {
    const res = await fetch(getApiUrl(`/api/materials/${id}`), {
      method: 'DELETE',
      credentials: 'include'
    })
    return handleResponse(res)
  },
  async createMaterial(data) {
    const res = await fetch(getApiUrl('/api/materials'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  }
}