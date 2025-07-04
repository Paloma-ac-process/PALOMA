import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Plan from '#models/plan'

export default class Intervention extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare planId: number

  @column()
  declare type: string

  @column()
  declare date: DateTime

  @column()
  declare description: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Plan)
  declare plan
} 