import User from '../models/User'
import File from '../models/File'

import Cache from '../../lib/Cache'

class UserController {
    async index (req, res) {
        const users = await User.findAll()

        return res.json(users)
    }

    async find (req, res) {
        const id = req.params['id']
        const users = await User.findByPk(id)

        return res.json(users)
    }

    async store (req, res) {


        const userExist = await User.findOne({
            where: { email: req.body.email },
        })
        if (userExist) {
            return res
                .status(400)
                .json({ error: 'Existe um usuario com este email' })
        }
        const { id, name, email, provider } = await User.create(req.body)

        if(provider){
            Cache.invalidate('providers')
        }

        return res.json({ id, name, email, provider })
    }

    async update (req, res) {
        const { email, oldPassword } = req.body

        const user = await User.findByPk(req.userId)

        if (user.email !== email) {
            const userExist = await User.findOne({ where: { email } })
            if (userExist) {
                return res
                    .status(400)
                    .json({ error: 'Existe um usuario com este email' })
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' })
        }

        await user.update(req.body)

        const { id, name, avatar } = await User.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        })

        return res.json({ id, name, email, avatar})
    }
}

export default new UserController()
