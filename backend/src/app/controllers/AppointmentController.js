// agendamentos cliente
import * as Yup from 'yup'

import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'

import CreateAppontmentService from '../services/CreateAppontmentService'
import CancelAppointmentservice from '../services/CancelAppointmentservice'
import Cache from '../../lib/Cache'

class AppointmentController {
    async index (req, res) {
        const { page = 1 } = req.query

        const cacheKey = `user:${req.userId}appointments:${page}`
        const cached = Cache.get(cacheKey)
        if (cached) {
            return res.json(cached)
        }

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            offset: (page - 1) * 20,
            order: ['date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        })
        await Cache.set(cacheKey, appointments)
        return res.json(appointments)
    }

    async store (req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }

        const { provider_id, date } = req.body

        const appointment = await CreateAppontmentService.run({
            provider_id,
            date,
            user_id: req.userId,
        })

        return res.json(appointment)
    }

    async delete (req, res) {
        const { id } = req.params
        const appointment = await CancelAppointmentservice.run({
            id,
            user_id: req.userId,
        })

        return res.json(appointment)
    }
}

export default new AppointmentController()
