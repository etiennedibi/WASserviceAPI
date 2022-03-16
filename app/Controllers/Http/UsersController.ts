import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {


    public async index({ response }: HttpContextContract) {
        const Users = await User.all()

        return response.ok(Users)
    }


    public async register({request}: HttpContextContract) {

        // Data Validattion
        const UserSchema = schema.create({
            username: schema.string(),
            email: schema.string({}, [
                rules.email({
                    sanitize: true,
                    ignoreMaxLength: true,
                    domainSpecificValidation: true,
                  })         
            ]),
            contact: schema.string(),
            password: schema.string({}, [
                rules.confirmed()
              ])
            ,
        })
        const messages = {
            '*': (field, rule) => {return `vous avez manqué d'ajouter un champ ${field}`}
          }
        const data = await request.validate({ schema: UserSchema, messages })
        // const alldata = request.all()

        //   User adding
        const newUsers = await User.create(data)
        return {
            message: "sucess",
            newUsers
        } 
    }

    // NOT ok
    public async login({request, auth, response}) {
        
        const email = request.input('email')
        const password = request.input('password')

        console.log(auth);
        
        const token = await auth.attempt(email, password)
        // try {
        //   const token = await auth.attempt(email, password)
        //   return token
        // } catch {
        //   return response.badRequest('Accès invalides')
        // }

        
    }
}
