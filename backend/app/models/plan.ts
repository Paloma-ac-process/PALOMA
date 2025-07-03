import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany } from '@adonisjs/lucid/orm'
import Client from './client.ts'
import Intervention from './intervention.ts'
import Material from './material.ts'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare clientId: number

  @column()
  declare filePath: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => Intervention)
  declare interventions

  @hasMany(() => Material)
  declare materials
} 