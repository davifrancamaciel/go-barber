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

export default function SignUp ({navigation}) {
  const passwordRef = useRef()
  const emailRef = useRef()

  function handleSubmit () {}

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
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Senha'
            returnKeyType='send'
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
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
