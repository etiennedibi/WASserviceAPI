import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFilesToProjects extends BaseSchema {
  protected tableName = 'add_files_to_projects'

  public async up () {
    this.schema.table('projects_demandes', (table) => {
      table.text('files').notNullable()
    })
  }

  public async down () {
    // this.schema.dropTable(this.tableName)
  }
}
