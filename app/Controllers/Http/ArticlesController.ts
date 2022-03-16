import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from '@ioc:Adonis/Core/Validator'
import Article from 'App/Models/Article'

export default class ArticlesController {

    public async index({ response }: HttpContextContract) {
        const Articles = await Article.all()

        return response.ok(Articles)
    }



    public async store({request}: HttpContextContract) {

        // Data Validattion
        const articleSchema = schema.create({
            title: schema.string(),
            content: schema.string(),
            concerning: schema.string(),
        })
        const messages = {
            '*': () => {return "vous avez manqué d'ajouter un champ"}
          }
        const data = await request.validate({ schema: articleSchema, messages })

        //   Article adding
        const newArticles = await Article.create(data)
        return {
            message: "sucess",
            newArticles
        } 
    }



    public async show({params, response}: HttpContextContract) {

        const oneArticle = await Article.find(params.id)
        if (!oneArticle) {
            return response.notFound({ message: 'Article introuvable' })
        }

        return response.ok(oneArticle)


    }
    





    public async update({request, response}: HttpContextContract) {

        // Data Validattion
        const articleSchema = schema.create({
            title: schema.string(),
            content: schema.string(),
            concerning: schema.string(),
        })
        const messages = {
            '*': () => {return "vous avez manqué d'ajouter un champ"}
          }
        const data = await request.validate({ schema: articleSchema, messages })
        const alldata = request.all()

          
        // Verify if the Article exist
        const aricle = await Article.find(alldata.id)
        if (!aricle) {
            return response.notFound({ message: 'aricle not found' })
        }

        // Article updating
        aricle.merge(data)
        await aricle.save()
        return response.ok(aricle)
    }







    public async destroy({params, response}: HttpContextContract) {

        const article: any = await Article.find(params.id)
        if (!article) {
            return response.notFound({ message: 'article introuvable' })
        }

        await article.delete()

        return response.ok({ message: 'suppression effectué avec succès' })
    }
    


}
