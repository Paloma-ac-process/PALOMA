const API_BASE_URL = 'http://localhost:3333' // URL du backend AdonisJS

class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important pour les sessions
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important pour les sessions
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants invalides')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la déconnexion')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Vérifier si l'utilisateur est connecté et obtenir ses informations
   */
  async checkAuth() {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        return data.user
      }

      return null
    } catch (error) {
      return null
    }
  }
}

export default new AuthService() 