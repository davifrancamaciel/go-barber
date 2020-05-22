import {Platform} from 'react-native'
import styled from 'styled-components'

import Button from '~/components/Button'
import Input from '~/components/Input'

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 30px;

  align-items: center;
  justify-content: center;
`
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`
export const FormInput = styled(Input)`
  margin-bottom: 0px;
  
`
export const SubmitButton = styled(Button)`
  margin-top: 10px;
`
export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`
export const SignLinkText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`
