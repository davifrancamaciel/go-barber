import React, { useState, useMemo, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  parseISO,
  isEqual
} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import { Container, Time } from './styles'

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

function Dashboard () {
  const [date, setDate] = useState(new Date())
  const [schedules, setSchedules] = useState([])
  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  )

  useEffect(() => {
    async function loadSchedule () {
      const response = await api.get('schedule', {
        params: {
          date
        }
      })

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const data = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        )
        const compareDate = utcToZonedTime(checkDate, timezone)
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          apponitment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          )
        }
      })
      
      setSchedules(data)
    }
    loadSchedule()
  }, [date])
  function handlePrevDay () {
    setDate(subDays(date, 1))
  }

  function handleNextDay () {
    setDate(addDays(date, 1))
  }

  return (
    <Container>
      <header>
        <button type='button' onClick={handlePrevDay}>
          <MdChevronLeft color='#fff' size={36} />
        </button>
        <strong>{dateFormated}</strong>
        <button type='button' onClick={handleNextDay}>
          <MdChevronRight color='#fff' size={36} />
        </button>
      </header>
      <ul>
        {schedules.map(schedule => (
          <Time
            key={schedule.time}
            past={schedule.past}
            available={!schedule.apponitment}
          >
            <strong>{schedule.time}</strong>
            <span>
              {schedule.apponitment
                ? schedule.apponitment.user.name
                : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  )
}

export default Dashboard
