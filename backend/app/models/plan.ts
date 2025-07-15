import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Client from './client.js'
import Intervention from './intervention.js'
import Material from './material.js'

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
  declare client: any

  @hasMany(() => Intervention)
  declare interventions: any

  @hasMany(() => Material)
  declare materials: any
} 