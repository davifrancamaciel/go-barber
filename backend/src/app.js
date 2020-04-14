import express from 'express'
import path from 'path'
import routes from './routes'

import './database'

class App {
    constructor () {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares () {
        this.server.use(express.json())
        // uso de rescursos staticos do servidor para o acesso get de css, imagens ...
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
        )
    }

    routes () {
        this.server.use(routes)
    }
}

export default new App().server
