import { schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {


    public async index({ response }) {
        const Users = await User.all()

        return response.ok(Users)
    }


    public async register({request}) {

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
    public async login({auth, request, response}) {
        
        const email = request.input('email')
        const password = request.input('password')

        const user = await User.query().where({email: email})
        if (!user){
          return response.status(404).json({
            error: true,
            message: 'user not found',
          })
        }
        
        try {
          const token = await auth.use('api').attempt(email, password, {expiresIn: '24hours'})
          return {token, user}
        } catch {
          return response.badRequest('Accès invalides')
        }

        
        
    }
}
