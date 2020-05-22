import React, { useState, useEffect, useMemo } from 'react'
import { MdNotifications } from 'react-icons/md'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll
} from './styles'

function Notifications () {
  const [visible, setVisible] = useState(false)
  const [notifications, setNotification] = useState([])
  /**
   *  useMemo vai escutar as alaterações na variavel notifications
   *e toda vez que houver auteração ele vai recalcular o valor para a variavel hasUnread
   */

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  )

  useEffect(() => {
    async function loadNotifications () {
      const response = await api.get('notifications')

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }))
      console.log(data)
      setNotification(data)
    }

    loadNotifications()
  }, [])

  function handleToggleVisible (params) {
    setVisible(!visible)
  }

  async function handleMarkAsRead (id) {
    await api.put(`notifications/${id}`)
    setNotification(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    )
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color='#7159c1' size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(n => (
            <Notification key={n._id} unread={!n.read}>
              <p>{n.content}</p>
              <time>{n.timeDistance}</time>
              {!n.read && (
                <button type='button' onClick={() => handleMarkAsRead(n._id)}>
                  Marcar como lido
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  )
}

export default Notifications
