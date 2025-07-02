const API_BASE_URL = 'http://localhost:3333/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  getHeaders() {
    const token = localStorage.getItem('paloma_token')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré, rediriger vers la connexion
          localStorage.removeItem('paloma_token')
          localStorage.removeItem('paloma_user')
          window.location.href = '/paloma/login'
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Authentification
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    })
  }

  // Dashboard
  async getDashboardData() {
    return this.request('/dashboard')
  }

  // Clients
  async getClients() {
    return this.request('/clients')
  }

  async getClient(id) {
    return this.request(`/clients/${id}`)
  }

  async createClient(clientData) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData)
    })
  }

  async updateClient(id, clientData) {
    return this.request(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData)
    })
  }

  async deleteClient(id) {
    return this.request(`/clients/${id}`, {
      method: 'DELETE'
    })
  }

  // Plans
  async getPlans() {
    return this.request('/plans')
  }

  async getPlan(id) {
    return this.request(`/plans/${id}`)
  }

  async createPlan(planData) {
    return this.request('/plans', {
      method: 'POST',
      body: JSON.stringify(planData)
    })
  }

  async updatePlan(id, planData) {
    return this.request(`/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(planData)
    })
  }

  async deletePlan(id) {
    return this.request(`/plans/${id}`, {
      method: 'DELETE'
    })
  }

  // Matériaux
  async getMaterials(planId = null) {
    const endpoint = planId ? `/materials?planId=${planId}` : '/materials'
    return this.request(endpoint)
  }

  async getMaterial(id) {
    return this.request(`/materials/${id}`)
  }

  async createMaterial(materialData) {
    return this.request('/materials', {
      method: 'POST',
      body: JSON.stringify(materialData)
    })
  }

  async updateMaterial(id, materialData) {
    return this.request(`/materials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(materialData)
    })
  }

  async deleteMaterial(id) {
    return this.request(`/materials/${id}`, {
      method: 'DELETE'
    })
  }

  // Interventions
  async getInterventions(planId = null) {
    const endpoint = planId ? `/interventions?planId=${planId}` : '/interventions'
    return this.request(endpoint)
  }

  async getIntervention(id) {
    return this.request(`/interventions/${id}`)
  }

  async createIntervention(interventionData) {
    return this.request('/interventions', {
      method: 'POST',
      body: JSON.stringify(interventionData)
    })
  }

  async updateIntervention(id, interventionData) {
    return this.request(`/interventions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(interventionData)
    })
  }

  async deleteIntervention(id) {
    return this.request(`/interventions/${id}`, {
      method: 'DELETE'
    })
  }

  // Jumeaux numériques
  async getDigitalTwins(planId = null) {
    const endpoint = planId ? `/digital-twins?planId=${planId}` : '/digital-twins'
    return this.request(endpoint)
  }

  async getDigitalTwin(id) {
    return this.request(`/digital-twins/${id}`)
  }

  async createDigitalTwin(twinData) {
    return this.request('/digital-twins', {
      method: 'POST',
      body: JSON.stringify(twinData)
    })
  }

  async updateDigitalTwin(id, twinData) {
    return this.request(`/digital-twins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(twinData)
    })
  }

  async deleteDigitalTwin(id) {
    return this.request(`/digital-twins/${id}`, {
      method: 'DELETE'
    })
  }

  // Calques
  async getPlanLayers(planId) {
    return this.request(`/plan-layers?planId=${planId}`)
  }

  async getPlanLayer(id) {
    return this.request(`/plan-layers/${id}`)
  }

  async createPlanLayer(layerData) {
    return this.request('/plan-layers', {
      method: 'POST',
      body: JSON.stringify(layerData)
    })
  }

  async updatePlanLayer(id, layerData) {
    return this.request(`/plan-layers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(layerData)
    })
  }

  async deletePlanLayer(id) {
    return this.request(`/plan-layers/${id}`, {
      method: 'DELETE'
    })
  }

  // Exports
  async getExports() {
    return this.request('/exports')
  }

  async getExport(id) {
    return this.request(`/exports/${id}`)
  }

  async createExport(exportData) {
    return this.request('/exports', {
      method: 'POST',
      body: JSON.stringify(exportData)
    })
  }

  async deleteExport(id) {
    return this.request(`/exports/${id}`, {
      method: 'DELETE'
    })
  }

  async downloadExport(id) {
    const token = localStorage.getItem('paloma_token')
    const response = await fetch(`${this.baseURL}/exports/${id}/download`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  }

  // Utilisateurs
  async getUsers() {
    return this.request('/users')
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    })
  }

  // Upload de fichiers
  async uploadFile(file, type = 'plan') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    const token = localStorage.getItem('paloma_token')
    const response = await fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export default new ApiService() 