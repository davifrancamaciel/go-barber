import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Notification from '../schemas/Notification'
import User from '../models/User'
import Appointment from '../models/Appointment'
import Cache from '../../lib/Cache'

class CreateAppontmentService {
    async run ({ provider_id, user_id, date }) {
        if (provider_id === user_id) {
            throw new Error('You cannot schedule for yourself')
        }

        // verifiar se é um provedor de serviço
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        })
        if (!isProvider) {
            throw new Error('You can only create appontments whith providers')
        }

        // checando se a data é retoativa
        const hourStart = startOfHour(parseISO(date))

        if (isBefore(hourStart, new Date())) {
            throw new Error('Past dates are not permited')
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
            throw new Error('Appointment date is not available')
        }

        const appointment = await Appointment.create({
            user_id,
            provider_id,
            date,
        })

        // notificar prestador de serviço
        const user = await User.findByPk(user_id)
        const formatedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        )

        await Notification.create({
            content: `Novo agendamento de ${user.name} para o ${formatedDate}`,
            user: provider_id,
        })

        // invalidar cache
        await Cache.invalidatePrefix(`user:${user.id}appointments`)
        return appointment
    }
}

export default new CreateAppontmentService()
