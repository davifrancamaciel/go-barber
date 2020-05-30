import React, {useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Image} from 'react-native'

import Background from '~/components/Background'
import {signInRequest} from '~/store/models/auth/actions'

import logo from '~/assets/logo.png'
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles'

export default function SignIn ({navigation}) {
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit () {
    dispatch(signInRequest(email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon='mail-outline'
            keyboardType='email-address'
            autoCorrect={false}
            autoCaptalize='none'
            placeholder='Digite seu email'
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Senha'
            ref={passwordRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
