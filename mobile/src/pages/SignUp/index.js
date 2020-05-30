import React, {useRef, useState} from 'react'
import {useDispatch} from 'react-redux'

import {Image} from 'react-native'
import Background from '~/components/Background'

import {signUpRequest} from '~/store/models/auth/actions'
import logo from '~/assets/logo.png'
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles'

export default function SignUp ({navigation}) {
  const passwordRef = useRef()
  const emailRef = useRef()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit () {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon='person-outline'
            keyboardType='email-address'
            autoCaptalize='none'
            placeholder='Digite seu nome'
            returnKeyType='next'
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon='mail-outline'
            autoCorrect={false}
            keyboardType='email-address'
            autoCaptalize='none'
            placeholder='Digite seu email'
            returnKeyType='next'
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Senha'
            returnKeyType='send'
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Cadastrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já possuo conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
