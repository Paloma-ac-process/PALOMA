import { BaseCommand } from '@adonisjs/core/ace'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class SetAdminRole extends BaseCommand {
  static commandName = 'set:admin-role'
  static description = 'Set admin role for a specific user'

  async run() {
    this.logger.info('👑 Setting admin role...')

    try {
      // Mettre à jour l'utilisateur theo.pellizzari@ac-process.com
      const result = await db.rawQuery(`
        UPDATE users 
        SET role = 'admin', is_verified = true 
        WHERE email = 'theo.pellizzari@ac-process.com'
      `)

      this.logger.info('✅ Admin role set successfully!')

      // Afficher tous les utilisateurs
      const users = await db.rawQuery('SELECT id, full_name, email, role, is_verified FROM users')
      this.logger.info('📋 Current users:')
      users.forEach((user: any) => {
        this.logger.info(`  - ${user.full_name} (${user.email}) - Role: ${user.role} - Verified: ${user.is_verified}`)
      })

    } catch (error) {
      this.logger.error('❌ Error setting admin role:', error.message)
      throw error
    }
  }
} 