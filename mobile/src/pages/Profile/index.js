import React, {useRef, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'

import {updateProfileRequest} from '~/store/models/user/actions'
import {
  Container,
  Title,
  Form,
  FormInput,
  SubmitButton,
  Separator,
} from './styles'

export default function Profile ({navigation}) {
  const profile = useSelector(state => state.user.profile)

  const emailRef = useRef()
  const oldPasswordRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const dispatch = useDispatch()

  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    setOldPassword('')
    setPassword('')
    setConfirmPassword('')
  }, [profile])

  
  function handleSubmit () {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    )
  }

  return (
    <Background>
      <Container>
        <Title>Perfil</Title>
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
            ref={emailRef}
            returnKeyType='next'
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Separator />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Senha atual'
            ref={oldPasswordRef}
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Nova senha'
            returnKeyType='next'
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Confirme a senha'
            returnKeyType='send'
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
        </Form>
      </Container>
    </Background>
  )
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({tintColor}) => (
    <Icon name='person' size={20} color={tintColor} />
  ),
}
