import { BaseCommand } from '@adonisjs/core/ace'
import app from '@adonisjs/core/services/app'
import User from '#models/user'

export default class ClearUsers extends BaseCommand {
  static commandName = 'clear:users'
  static description = 'Supprimer tous les utilisateurs de la base de données'

  async run() {
    await app.boot()

    // Compter les utilisateurs avant suppression
    const userCount = await User.query().count('* as total').first()
    const count = userCount?.$extras.total || 0
    
    if (count === 0) {
      this.logger.info('Aucun utilisateur à supprimer.')
      return
    }

    // Demander confirmation
    const confirmed = await this.prompt.confirm(
      `Êtes-vous sûr de vouloir supprimer ${count} utilisateur(s) ?`
    )

    if (!confirmed) {
      this.logger.info('Opération annulée.')
      return
    }

    // Supprimer tous les utilisateurs
    await User.query().delete()
    
    this.logger.success(`✅ ${count} utilisateur(s) supprimé(s) avec succès !`)
  }
} 