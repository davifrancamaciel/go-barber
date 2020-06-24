import React, {useState, useMemo} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {DatePickerAndroid} from 'react-native'
import {format} from 'date-fns'
import pt from 'date-fns/locale/pt'

import {Container, DateButton, DateText, Piker} from './styles'

const DateInput = ({date, onChange}) => {
  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  )
  async function handleOpenPiker () {
    const {action, day, year, month} = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    })
    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day)
      onChange(selectedDate)
    }
  }
  return (
    <Container>
      <DateButton onPress={handleOpenPiker}>
        <Icon name='event' size={20} color='#fff' />
        <DateText>{dateFormated}</DateText>
      </DateButton>
    </Container>
  )
}

export default DateInput
