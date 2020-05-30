import React, {useRef, useState} from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'

export default function Profile ({navigation}) {
  return (
    <Background>
      <View>
        <Text>Perfil</Text>
      </View>
    </Background>
  )
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({tintColor}) => (
    <Icon name='person' size={20} color={tintColor} />
  ),
}
