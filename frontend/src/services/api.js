const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

function getToken() {
  return localStorage.getItem('paloma_token')
}

async function handleResponse(res) {
  if (!res.ok) throw new Error(await res.text() || 'Erreur API')
  return await res.json()
}

export default {
  // Utilisateurs
  async getUsers() {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updateUserRole(id, role) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({ role })
    })
    return handleResponse(res)
  },
  async deleteUser(id) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createUser(data) {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Clients
  async getClients() {
    const res = await fetch(`${API_BASE_URL}/api/clients`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updateClient(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteClient(id) {
    const res = await fetch(`${API_BASE_URL}/api/clients/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createClient(data) {
    const res = await fetch(`${API_BASE_URL}/api/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Plans
  async getPlans() {
    const res = await fetch(`${API_BASE_URL}/api/plans`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updatePlan(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deletePlan(id) {
    const res = await fetch(`${API_BASE_URL}/api/plans/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createPlan(data) {
    const res = await fetch(`${API_BASE_URL}/api/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Exports
  async getExports() {
    const res = await fetch(`${API_BASE_URL}/api/exports`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updateExport(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/exports/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteExport(id) {
    const res = await fetch(`${API_BASE_URL}/api/exports/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createExport(data) {
    const res = await fetch(`${API_BASE_URL}/api/exports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Interventions
  async getInterventions() {
    const res = await fetch(`${API_BASE_URL}/api/interventions`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updateIntervention(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/interventions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteIntervention(id) {
    const res = await fetch(`${API_BASE_URL}/api/interventions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createIntervention(data) {
    const res = await fetch(`${API_BASE_URL}/api/interventions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  // Matériaux
  async getMaterials() {
    const res = await fetch(`${API_BASE_URL}/api/materials`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async updateMaterial(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/materials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },
  async deleteMaterial(id) {
    const res = await fetch(`${API_BASE_URL}/api/materials/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    return handleResponse(res)
  },
  async createMaterial(data) {
    const res = await fetch(`${API_BASE_URL}/api/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  }
} 