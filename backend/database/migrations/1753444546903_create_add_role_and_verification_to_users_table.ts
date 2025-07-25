import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Ajouter la colonne role si elle n'existe pas
      if (!this.schema.hasColumn(this.tableName, 'role')) {
        table.string('role').notNullable().defaultTo('client')
      }
      
      // Ajouter la colonne verification_code si elle n'existe pas
      if (!this.schema.hasColumn(this.tableName, 'verification_code')) {
        table.string('verification_code').nullable()
      }
      
      // Ajouter la colonne is_verified si elle n'existe pas
      if (!this.schema.hasColumn(this.tableName, 'is_verified')) {
        table.boolean('is_verified').notNullable().defaultTo(false)
      }
    })

    // Mettre à jour les utilisateurs existants
    await this.db.rawQuery(`
      UPDATE users 
      SET role = 'client', is_verified = true 
      WHERE role IS NULL OR is_verified IS NULL
    `)

    // Marquer le premier utilisateur comme admin
    await this.db.rawQuery(`
      UPDATE users 
      SET role = 'admin' 
      WHERE id = 1
    `)
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
      table.dropColumn('verification_code')
      table.dropColumn('is_verified')
    })
  }
}