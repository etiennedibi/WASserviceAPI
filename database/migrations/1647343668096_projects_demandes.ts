import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjectsDemandes extends BaseSchema {
  protected tableName = 'projects_demandes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fullname', 80).notNullable()
      table.string('comapny', 80).notNullable()
      table.string('email', 254).notNullable()
      table.text('description').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
