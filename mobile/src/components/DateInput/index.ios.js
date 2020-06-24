import React, {useState, useMemo} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {DatePickerIOS} from 'react-native'
import {format} from 'date-fns'
import pt from 'date-fns/locale/pt'

import {Container, DateButton, DateText,Piker} from './styles'

const DateInput = ({date, onChange}) => {
  const [opened, setOpened] = useState(false)
  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  )
  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name='event' size={20} color='#fff' />
        <DateText>{dateFormated}</DateText>
        {opened && (
          <Piker>
            <DatePickerIOS
              date={date}
              onDateChange={onChange}
              minimumDate={new Date()}
              minuteInterval={60}
              locale='pt'
              mode='date'
            />
          </Piker>
        )}
      </DateButton>
    </Container>
  )
}

export default DateInput
