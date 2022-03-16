import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Article from 'App/Models/Article'

import {
  column,
  BaseModel,
  beforeSave,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public contact: string

  @column({ serializeAs: null })
  public password: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



  @hasMany(()=> Article, {
    foreignKey:'userId'
  })
  public articles: HasMany<typeof Article>


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }





}
