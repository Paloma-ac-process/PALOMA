// Configuration de l'API - Updated for production deployment
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://paloma-production.up.railway.app'
}

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
} 