import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'

const models = [User]

class Database {
    constructor () {
        this.init()
    }
    init () {
        this.connection = new Sequelize(databaseConfig)
        // neste ponto faço o map para percorer cada model passado a conexao para cada um em seu contrutor
        models.map(model => model.init(this.connection))
    }
}

export default new Database()
