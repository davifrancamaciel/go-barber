// agendamentos cliente
import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'

class AppointmentController {
    async index (req, res) {
        const { page = 1 } = req.query

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            attributes: ['id', 'date','past', 'cancelable'],
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

        if (provider_id === req.userId) {
            return res.status(401).json({
                erros: 'You cannot schedule for yourself',
            })
        }

        // verifiar se é um provedor de serviço
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        })
        if (!isProvider) {
            return res.status(401).json({
                erros: 'You can only create appontments whith providers',
            })
        }

        // checando se a data é retoativa
        const hourStart = startOfHour(parseISO(date))

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ erros: 'Past dates are not permited' })
        }
        //Checando se a data esta disponivel
        const checkAvailability = await Appointment.findOne({
            where: {
                date: hourStart,
                provider_id,
                canceled_at: null,
            },
        })
        if (checkAvailability) {
            return res
                .status(400)
                .json({ erros: 'Appointment date is not available' })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date
        })

        // notificar prestador de serviço
        const user = await User.findByPk(req.userId)
        const formatedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        )

        await Notification.create({
            content: `Novo agendamento de ${user.name} para o ${formatedDate}`,
            user: provider_id,
        })

        return res.json(appointment)
    }

    async delete (req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        })

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                erros: 'You dont have permission to cancel this appointment',
            })
        }

        // metodo subHours para remover 2 horas da data do agendamento
        const dateWithSub = subHours(appointment.date, 2)

        // verifica se a hora do agendamento menos 2h é menor(antes) que a hora atual
        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                erros: 'You can only cancel appointments 2 hours in advance',
            })
        }

        appointment.canceled_at = new Date()
        await appointment.save()

        await Queue.add(CancellationMail.key, { appointment })

        return res.json(appointment)
    }
}

export default new AppointmentController()
