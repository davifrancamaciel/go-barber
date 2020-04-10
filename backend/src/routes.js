import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

const routes = new Router()

// rotas publicas
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// rotas privadas
routes.use(authMiddleware)// daqui para abaixo o usuario dever estar autenticacdo
routes.get('/users', UserController.index)
routes.put('/users', authMiddleware, UserController.update)
routes.get('/users/:id', UserController.find)

export default routes
