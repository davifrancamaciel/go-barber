import { isBefore, subHours } from 'date-fns'

import User from '../models/User'
import Appointment from '../models/Appointment'

import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'
import Cache from '../../lib/Cache'

class CancelAppointmentservice {
    async run ({ id, user_id }) {
        const appointment = await Appointment.findByPk(id, {
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

        if (appointment.user_id !== user_id) {
            throw new Error(
                'You dont have permission to cancel this appointment'
            )
        }

        // metodo subHours para remover 2 horas da data do agendamento
        const dateWithSub = subHours(appointment.date, 2)

        // verifica se a hora do agendamento menos 2h é menor(antes) que a hora atual
        if (isBefore(dateWithSub, new Date())) {
            throw new Error(
                'You can only cancel appointments 2 hours in advance'
            )
        }

        appointment.canceled_at = new Date()
        await appointment.save()

        await Queue.add(CancellationMail.key, { appointment })
        // invalidar cache
        await Cache.invalidatePrefix(`user:${user_id}appointments`)
        return appointment
    }
}

export default new CancelAppointmentservice()
