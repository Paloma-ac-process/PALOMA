import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import VerificationCodeMail from '#mails/verification_code'
import { randomInt } from 'crypto'

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
  async register({ request, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    try {
      // Générer un code de vérification à 6 chiffres
      const verificationCode = String(randomInt(100000, 999999))

      // Créer le nouvel utilisateur avec le code et isVerified à false
      const user = await User.create({
        email,
        password,
        fullName,
        verificationCode,
        isVerified: false,
      })

      // Envoyer le mail de vérification (HTML direct, sans template)
      try {
      const mail = await import('@adonisjs/mail/services/main').then(m => m.default)
        await mail.send((message) => {
          message
            .to(email)
            .from('noreplyactest@gmail.com')
            .subject('Votre code de vérification')
            .html(`<h2>Votre code de vérification</h2><p>Bonjour,</p><p>Voici votre code : <b>${verificationCode}</b></p>`)
        })
      } catch (mailError) {
        console.log('Erreur envoi mail:', mailError.message)
        // On continue même si l'email ne peut pas être envoyé
      }

      return response.json({
        success: true,
        message: 'Utilisateur créé. Un code de vérification a été envoyé par email.',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt,
          isVerified: user.isVerified
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
   * Vérifier le code de vérification reçu par email
   */
  async verifyCode({ request, response }: HttpContext) {
    const { email, code } = request.only(['email', 'code'])
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
    }
    if (user.verificationCode !== code) {
      return response.status(400).json({ success: false, message: 'Code de vérification invalide' })
    }
    user.isVerified = true
    user.verificationCode = null
    await user.save()
    return response.json({ success: true, message: 'Compte vérifié avec succès' })
  }

  /**
   * Traiter la connexion d'un utilisateur (API)
   */
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Vérifier les identifiants
      const user = await User.verifyCredentials(email, password)

      // Vérifier si le compte est vérifié
      if (!user.isVerified) {
        return response.status(403).json({
          success: false,
          message: 'Votre compte n\'est pas encore vérifié. Veuillez vérifier votre email.'
        })
      }

      // Connecter l'utilisateur
      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Connexion réussie',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
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
          role: user.role,
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

  /**
   * Mettre à jour les informations de l'utilisateur connecté (API)
   */
  async updateMe({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
      if (fullName) user.fullName = fullName
      if (email) user.email = email
      if (password) user.password = password
      await user.save()
      return response.json({
        success: true,
        message: 'Informations utilisateur mises à jour',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt
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
   * Renvoyer le code de vérification par email
   */
  async resendCode({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
    }
    if (user.isVerified) {
      return response.status(400).json({ success: false, message: 'Compte déjà vérifié' })
    }
    // Générer un nouveau code
    const verificationCode = String(Math.floor(100000 + Math.random() * 900000))
    user.verificationCode = verificationCode
    await user.save()
    // Envoyer le mail de vérification (HTML direct, sans template)
    const mail = await import('@adonisjs/mail/services/main').then(m => m.default)
    await mail.send((message) => {
      message
        .to(email)
        .from('noreplyactest@gmail.com')
        .subject('Votre code de vérification')
        .html(`<h2>Votre code de vérification</h2><p>Bonjour,</p><p>Voici votre code : <b>${verificationCode}</b></p>`)
    })
    return response.json({ success: true, message: 'Nouveau code envoyé par email' })
  }

  /**
   * Envoyer un code de réinitialisation de mot de passe
   */
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
    }
    // Générer un code de réinitialisation
    const resetCode = String(Math.floor(100000 + Math.random() * 900000))
    user.verificationCode = resetCode
    await user.save()
    const mail = await import('@adonisjs/mail/services/main').then(m => m.default)
    await mail.send(new VerificationCodeMail(email, resetCode))
    return response.json({ success: true, message: 'Un code de réinitialisation a été envoyé par email' })
  }

  /**
   * Réinitialiser le mot de passe avec le code reçu
   */
  async resetPassword({ request, response }: HttpContext) {
    const { email, code, newPassword } = request.only(['email', 'code', 'newPassword'])
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
    }
    if (user.verificationCode !== code) {
      return response.status(400).json({ success: false, message: 'Code de réinitialisation invalide' })
    }
    user.password = newPassword
    user.verificationCode = null
    await user.save()
    return response.json({ success: true, message: 'Mot de passe réinitialisé avec succès' })
  }
} 