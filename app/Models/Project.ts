import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProjectsDemande extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullname: string

  @column()
  public comapny: string

  @column()
  public email: string

  @column()
  public description: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
