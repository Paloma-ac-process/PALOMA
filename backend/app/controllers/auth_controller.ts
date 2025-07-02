import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Afficher le formulaire de connexion
   */
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  /**
   * Afficher le formulaire d'inscription
   */
  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  /**
   * Traiter l'inscription d'un nouvel utilisateur (API)
   */
  async register({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    try {
      // Créer le nouvel utilisateur
      const user = await User.create({
        email,
        password,
        fullName,
      })

      // Connecter l'utilisateur après l'inscription
      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Utilisateur créé avec succès',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Erreur lors de la création du compte',
        error: error.message
      })
    }
  }

  /**
   * Traiter la connexion d'un utilisateur (API)
   */
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Vérifier les identifiants
      const user = await User.verifyCredentials(email, password)

      // Connecter l'utilisateur
      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Connexion réussie',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      })
    }
  }

  /**
   * Déconnecter l'utilisateur (API)
   */
  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.json({
        success: true,
        message: 'Déconnexion réussie'
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la déconnexion'
      })
    }
  }

  /**
   * Obtenir les informations de l'utilisateur connecté (API)
   */
  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      return response.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié'
      })
    }
  }

  /**
   * Afficher le tableau de bord (page protégée)
   */
  async dashboard({ auth, view }: HttpContext) {
    const user = auth.user!
    return view.render('dashboard', { user })
  }
} 