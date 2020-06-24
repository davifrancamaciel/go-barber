import React, {useEffect, useState, useMemo} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import {Container, Avatar, Name, Time, SubmitButton} from './styles'

import {formatRelative, parseISO} from 'date-fns'
import pt from 'date-fns/locale/pt'

export default function Confirm ({navigation}) {
  const provider = navigation.getParam('provider')
  const time = navigation.getParam('hour')

  const dateFormated = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: pt,
      }),
    [time],
  )

  async function handleAddAppointment () {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    })
    
    navigation.navigate('Dashboard')
  }
  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormated}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          <Text>Confirmar agendamento</Text>
        </SubmitButton>
      </Container>
    </Background>
  )
}

Confirm.navigationOptions = ({navigation}) => ({
  title: 'Confirmar agendamento',

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}>
      <Icon name='chevron-left' size={20} color='#fff' />
    </TouchableOpacity>
  ),
})
