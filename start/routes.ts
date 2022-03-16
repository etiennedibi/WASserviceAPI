/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'Welcome to W.A.S service' }
})


Route.post('article/add', 'ArticlesController.store')
Route.get('article/list', 'ArticlesController.index')
Route.put('article/update', 'ArticlesController.update')



Route.post('project/add', 'ProjectsController.store')
Route.get('project/list', 'ProjectsController.index')


Route.get('user/list', 'UsersController.index')
Route.post('user/register', 'UsersController.register')
Route.post('user/login', 'UsersController.login')







// route with params
Route.get('article/show/:id', 'ArticlesController.show')
Route.delete('article/delete/:id', 'ArticlesController.destroy')


Route.get('project/show/:id', 'ProjectsController.show')
