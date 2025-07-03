import { BaseCommand } from '@adonisjs/core/ace'
import app from '@adonisjs/core/services/app'
import User from '#models/user'

export default class CreateAdmin extends BaseCommand {
  static commandName = 'make:admin'
  static description = 'Créer ou mettre à jour un compte admin'

  async run() {
    await app.boot()

    const email = 'th30pelli@gmail.com'
    const password = 'Theopelli2003%'
    const role = 'admin'

    let user = await User.findBy('email', email)

    if (!user) {
      user = await User.create({ email, password, role })
      this.logger.success('✅ Compte admin créé !')
    } else {
      user.role = role
      user.password = password 
      await user.save()
      this.logger.success('✅ Rôle admin appliqué à l\'utilisateur existant !')
    }

    this.logger.info(`Email : ${email}`)
    this.logger.info(`Mot de passe : ${password}`)
    this.logger.info(`Rôle : ${role}`)
  }
} 