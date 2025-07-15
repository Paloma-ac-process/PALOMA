import { BaseCommand } from '@adonisjs/core/ace'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class DbSetup extends BaseCommand {
  static commandName = 'db:setup'
  static description = 'Setup database and run migrations'

  async run() {
    try {
      // Test connection
      await db.rawQuery('SELECT 1')
      this.logger.info('Database connection successful')
      
      // Run migrations
      await this.kernel.exec('migration:run', [])
      this.logger.info('Migrations completed successfully')
      
    } catch (error) {
      this.logger.error('Database setup failed:', error.message)
      throw error
    }
  }
} 