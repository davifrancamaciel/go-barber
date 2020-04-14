import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import databaseConfig from '../config/database'

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
import { MONGODB_URL } from '../consts'

const models = [User, File, Appointment]

class Database {
    constructor () {
        this.init()
        this.mongo()
    }
    init () {
        this.connection = new Sequelize(databaseConfig)
        // neste ponto faço o map para percorer cada model passado a conexao para cada um em seu contrutor
        models
            .map(model => model.init(this.connection))
            // trecho para associação de models que será chamado somente se o metodo associate existir na model
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            )
    }

    mongo () {
        this.mongooseConnection = mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
    }
}

export default new Database()
