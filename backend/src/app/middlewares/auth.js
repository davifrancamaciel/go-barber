import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { promisify } from 'util'

export default async (req, res, next) => {
    const autHeader = req.headers.authorization

    if (!autHeader) {
        return res.status(401).json({ error: 'Token not provided' })
    }
    const [, token] = autHeader.split(' ')
    try {
        // promisify função para ternsformar finçoes callback em promise
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        console.log(decoded)
        // incluido o userId na requisição sendo assim toda a requisição que que o usuario estiver autenticado vai conter o idntificador dele
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' })
    }
}
