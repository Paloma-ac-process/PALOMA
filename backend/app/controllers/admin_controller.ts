import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AdminController {
  /**
   * Lister tous les utilisateurs (admin seulement)
   */
  async listUsers({ auth, response }: HttpContext) {
    const user = auth.user!
    
    console.log('🔍 Admin check - User:', {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isVerified: user.isVerified
    })
    
    if (user.role !== 'admin') {
      console.log('❌ Access denied - User role:', user.role)
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    try {
      const users = await User.query()
        .select('id', 'fullName', 'email', 'role', 'isVerified', 'createdAt', 'updatedAt')
        .orderBy('createdAt', 'desc')

      return response.json({
        success: true,
        users,
        total: users.length
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des utilisateurs',
        error: error.message
      })
    }
  }

  /**
   * Obtenir un utilisateur spécifique (admin seulement)
   */
  async getUser({ params, auth, response }: HttpContext) {
    const user = auth.user!
    
    if (user.role !== 'admin') {
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    try {
      const targetUser = await User.findOrFail(params.id)
      
      return response.json({
        success: true,
        user: {
          id: targetUser.id,
          fullName: targetUser.fullName,
          email: targetUser.email,
          role: targetUser.role,
          isVerified: targetUser.isVerified,
          createdAt: targetUser.createdAt,
          updatedAt: targetUser.updatedAt
        }
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }
  }

  /**
   * Créer un nouvel utilisateur (admin seulement)
   */
  async createUser({ request, auth, response }: HttpContext) {
    const user = auth.user!
    
    if (user.role !== 'admin') {
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    const { email, password, fullName, role = 'client' } = request.only([
      'email', 'password', 'fullName', 'role'
    ])

    try {
      // Vérifier si l'email existe déjà
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.status(400).json({
          success: false,
          message: 'Un utilisateur avec cet email existe déjà'
        })
      }

      // Créer le nouvel utilisateur
      const newUser = await User.create({
        email,
        password,
        fullName,
        role,
        isVerified: true, // Les admins créent des comptes déjà vérifiés
        verificationCode: null
      })

      return response.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
          isVerified: newUser.isVerified,
          createdAt: newUser.createdAt
        }
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error.message
      })
    }
  }

  /**
   * Mettre à jour un utilisateur (admin seulement)
   */
  async updateUser({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    
    if (user.role !== 'admin') {
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    const { email, fullName, role, isVerified } = request.only([
      'email', 'fullName', 'role', 'isVerified'
    ])

    try {
      const targetUser = await User.findOrFail(params.id)
      
      // Vérifier si l'email existe déjà (sauf pour cet utilisateur)
      if (email && email !== targetUser.email) {
        const existingUser = await User.findBy('email', email)
        if (existingUser) {
          return response.status(400).json({
            success: false,
            message: 'Un utilisateur avec cet email existe déjà'
          })
        }
      }

      // Mettre à jour les champs
      if (email) targetUser.email = email
      if (fullName) targetUser.fullName = fullName
      if (role) targetUser.role = role
      if (typeof isVerified === 'boolean') targetUser.isVerified = isVerified

      await targetUser.save()

      return response.json({
        success: true,
        message: 'Utilisateur mis à jour avec succès',
        user: {
          id: targetUser.id,
          fullName: targetUser.fullName,
          email: targetUser.email,
          role: targetUser.role,
          isVerified: targetUser.isVerified,
          updatedAt: targetUser.updatedAt
        }
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Erreur lors de la mise à jour',
        error: error.message
      })
    }
  }

  /**
   * Supprimer un utilisateur (admin seulement)
   */
  async deleteUser({ params, auth, response }: HttpContext) {
    const user = auth.user!
    
    if (user.role !== 'admin') {
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    try {
      const targetUser = await User.findOrFail(params.id)
      
      // Empêcher la suppression de son propre compte
      if (targetUser.id === user.id) {
        return response.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas supprimer votre propre compte'
        })
      }

      await targetUser.delete()

      return response.json({
        success: true,
        message: 'Utilisateur supprimé avec succès'
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Erreur lors de la suppression',
        error: error.message
      })
    }
  }

  /**
   * Statistiques des utilisateurs (admin seulement)
   */
  async getUserStats({ auth, response }: HttpContext) {
    const user = auth.user!
    
    if (user.role !== 'admin') {
      return response.status(403).json({
        success: false,
        message: 'Accès interdit. Rôle admin requis.'
      })
    }

    try {
      const totalUsers = await User.query().count('* as total').first()
      const verifiedUsers = await User.query().where('isVerified', true).count('* as total').first()
      const adminUsers = await User.query().where('role', 'admin').count('* as total').first()
      const clientUsers = await User.query().where('role', 'client').count('* as total').first()

      // Utilisateurs créés ce mois
      const thisMonth = new Date()
      thisMonth.setDate(1)
      thisMonth.setHours(0, 0, 0, 0)
      
      const newThisMonth = await User.query()
        .where('createdAt', '>=', thisMonth.toISOString())
        .count('* as total')
        .first()

      return response.json({
        success: true,
        stats: {
          total: totalUsers?.$extras.total || 0,
          verified: verifiedUsers?.$extras.total || 0,
          admins: adminUsers?.$extras.total || 0,
          clients: clientUsers?.$extras.total || 0,
          newThisMonth: newThisMonth?.$extras.total || 0
        }
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors du calcul des statistiques',
        error: error.message
      })
    }
  }
} 