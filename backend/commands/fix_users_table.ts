import { BaseCommand } from '@adonisjs/core/ace'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class FixUsersTable extends BaseCommand {
  static commandName = 'fix:users-table'
  static description = 'Fix users table structure and update roles'

  async run() {
    this.logger.info('🔧 Fixing users table structure...')

    try {
      // Vérifier si les colonnes existent
      const hasRole = await db.rawQuery(`
        SELECT COUNT(*) as count 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
      `)
      
      const hasVerified = await db.rawQuery(`
        SELECT COUNT(*) as count 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'is_verified'
      `)

      // Ajouter les colonnes si elles n'existent pas
      if (hasRole[0].count === 0) {
        this.logger.info('➕ Adding role column...')
        await db.rawQuery('ALTER TABLE users ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT "client"')
      }

      if (hasVerified[0].count === 0) {
        this.logger.info('➕ Adding is_verified column...')
        await db.rawQuery('ALTER TABLE users ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT false')
      }

      // Mettre à jour les utilisateurs existants
      this.logger.info('🔄 Updating existing users...')
      await db.rawQuery(`
        UPDATE users 
        SET role = 'client', is_verified = true 
        WHERE role IS NULL OR is_verified IS NULL
      `)

      // Marquer le premier utilisateur comme admin
      this.logger.info('👑 Setting first user as admin...')
      await db.rawQuery(`
        UPDATE users 
        SET role = 'admin' 
        WHERE id = 1
      `)

      // Afficher les utilisateurs
      const users = await db.rawQuery('SELECT id, full_name, email, role, is_verified FROM users')
      this.logger.info('📋 Current users:')
      users.forEach((user: any) => {
        this.logger.info(`  - ${user.full_name} (${user.email}) - Role: ${user.role} - Verified: ${user.is_verified}`)
      })

      this.logger.success('✅ Users table fixed successfully!')

    } catch (error) {
      this.logger.error('❌ Error fixing users table:', error.message)
      throw error
    }
  }
} 