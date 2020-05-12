import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import logo from '~/assets/logo.svg'
import { signInRequest } from '~/store/models/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obigatório'),
  password: Yup.string().required('A senha é obigatória')
})

function SignIn () {
  const dispatch = useDispatch()
  function handleSubmit ({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <img src={logo} alt='Go Barber' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>Acessar</button>
        <Link to='/register'>Criar conta </Link>
      </Form>
    </>
  )
}

export default SignIn
