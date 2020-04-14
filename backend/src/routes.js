import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationController from './app/controllers/NotificationController'


const routes = new Router()
const upload = multer(multerConfig)

// rotas publicas
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// rotas privadas
routes.use(authMiddleware) // daqui para abaixo o usuario dever estar autenticacdo
routes.get('/users', UserController.index)
routes.put('/users', authMiddleware, UserController.update)
routes.get('/users/:id', UserController.find)

routes.get('/providers', ProviderController.index)

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.store)
routes.delete('/appointments/:id', AppointmentController.delete)

routes.get('/schedule', ScheduleController.index)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)


routes.post('/files', upload.single('file'), FileController.store)




export default routes
