import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interventions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('CASCADE')
      table.string('type').notNullable()
      table.date('date').notNullable()
      table.string('description').nullable()
      table.string('status').notNullable().defaultTo('pending')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
} 