const API_BASE_URL = 'http://localhost:3333' // URL du backend AdonisJS

class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
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
      const response = await fetch(`${API_BASE_URL}/api/login`, {
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
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
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
      const response = await fetch(`${API_BASE_URL}/api/me`, {
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

  /**
   * Vérification du code reçu par email
   */
  async verifyCode({ email, code }) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Code invalide')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Renvoyer le code de vérification
   */
  async resendCode(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du code')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Demander un code de réinitialisation de mot de passe
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du mail')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Réinitialiser le mot de passe avec le code reçu
   */
  async resetPassword({ email, code, newPassword }) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, newPassword }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la réinitialisation')
      }
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService() 