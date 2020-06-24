import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import DateInput from '~/components/DateInput'
import {Container, HourList, Hour, Title} from './styles'

export default function SelectDateTime ({navigation}) {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState([])
  const provider = navigation.getParam('provider')

  function handleSelectHour (hour) {
    navigation.navigate('Confirm', {
      provider,
      hour,
    })
  }

  useEffect(() => {
    async function loadAvailable () {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      })
      setHours(response.data)
    }
    loadAvailable()
  }, [date, provider.id])
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Hour
              enabled={item.available}
              onPress={() => handleSelectHour(item.value)}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  )
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}>
      <Icon name='chevron-left' size={20} color='#fff' />
    </TouchableOpacity>
  ),
})
