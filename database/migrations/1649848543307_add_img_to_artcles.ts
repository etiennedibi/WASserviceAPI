import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddImgToArtcles extends BaseSchema {
  protected tableName = 'add_img_to_artcles'

  public async up () {
    this.schema.table('articles', (table) => {
      table.text('illustration').notNullable()
    })
  }

  public async down () {
    // this.schema.dropTable('articles')
  }
}
