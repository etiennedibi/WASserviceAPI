import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'

export default class ProjectsController {


    public async index({ response }: HttpContextContract) {
        const Projects = await Project.all()

        return response.ok(Projects)
    }


    public async store({request}: HttpContextContract) {

        // Data Validattion
        const ProjectSchema = schema.create({
            fullname: schema.string(),
            email: schema.string({}, [
                rules.email({
                    sanitize: true,
                    ignoreMaxLength: true,
                    domainSpecificValidation: true,
                  })         
            ]),
            comapny: schema.string(),
            description: schema.string(),
        })
        const messages = {
            '*': (field, rule) => {return `vous avez manqué d'ajouter un champ ${field}`}
          }
        const data = await request.validate({ schema: ProjectSchema, messages })
        const alldata = request.all()

        //   Project adding
        const newProjects = await Project.create(alldata)
        return {
            message: "sucess",
            newProjects
        } 
    }



    public async show({params, response}: HttpContextContract) {

        const oneProject = await Project.find(params.id)
        if (!oneProject) {
            return response.notFound({ message: 'Project introuvable' })
        }

        return response.ok(oneProject)


    }



}
