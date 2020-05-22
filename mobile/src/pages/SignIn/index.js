import React, {useRef} from 'react'
import {Image} from 'react-native'
import Background from '~/components/Background'

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

  function handleSubmit () {}
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
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Senha'
            ref={passwordRef}
            returnKeyType='send'
            onSubmitEditing={ handleSubmit}
          />
          <SubmitButton onPress={ handleSubmit}>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
