import 'dotenv/config'
import express from 'express'
import * as Sentry from '@sentry/node'
import Youch from 'youch'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'
import routes from './routes'

import sentryConfog from './config/sentry'
import './database'

class App {
    constructor () {
        this.server = express()
        // monitor de erros na aplicação
        Sentry.init(sentryConfog)
        this.middlewares()
        this.routes()
        this.exceptionHander()
    }

    middlewares () {
        // The request handler must be the first middleware on the app
        this.server.use(Sentry.Handlers.requestHandler())
        this.server.use(cors())
        this.server.use(express.json())
        // uso de rescursos staticos do servidor para o acesso get de css, imagens ...
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
        )
    }

    routes () {
        this.server.use(routes)
        // The error handler must be before any other error middleware and after all controllers
        this.server.use(Sentry.Handlers.errorHandler())
    }

    exceptionHander () {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                // Youch => tratativa para mensagens de erro
                const erros = await new Youch(err, req).toJSON()

                return res.status(500).json(erros)
            }
            return res.status(500).json({ error: 'Internal server error' })
        })
    }
}

export default new App().server
