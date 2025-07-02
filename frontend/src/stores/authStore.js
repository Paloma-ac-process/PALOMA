import { defineStore } from 'pinia'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    /**
     * Inscription d'un nouvel utilisateur
     */
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await authService.register(userData)
        this.user = result.user
        this.isAuthenticated = true
        return result
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Connexion d'un utilisateur
     */
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const result = await authService.login(credentials)
        this.user = result.user
        this.isAuthenticated = true
        return result
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Déconnexion de l'utilisateur
     */
    async logout() {
      this.loading = true
      
      try {
        await authService.logout()
        this.user = null
        this.isAuthenticated = false
        this.error = null
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Vérifier l'état d'authentification
     */
    async checkAuth() {
      try {
        const user = await authService.checkAuth()
        if (user) {
          this.user = user
          this.isAuthenticated = true
        } else {
          this.user = null
          this.isAuthenticated = false
        }
        return user
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        return null
      }
    },

    /**
     * Effacer les erreurs
     */
    clearError() {
      this.error = null
    }
  }
}) 