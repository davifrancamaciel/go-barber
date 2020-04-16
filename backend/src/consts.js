const PORT = 3399
const BASE_URL = `http://localhost:${PORT}`

module.exports = {
    PORT,
    BASE_URL,
}

/*
ANOTAÇÕES
modo para criar migrations
yarn sequelize migration:create --name create-users
yarn sequelize migration:create --name create-files
yarn sequelize migration:create --name add-avatar-field-to-users
yarn sequelize db:migrate

multer biblioteca para upload de arquivos
*/
