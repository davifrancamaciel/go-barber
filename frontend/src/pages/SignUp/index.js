import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import logo from '~/assets/logo.svg'
import { signUpRequest } from '~/store/models/auth/actions'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obigatório'),
  password: Yup.string()
    .min(6, 'No minimo 6 carcteres')
    .required('A senha é obigatória')
})

function SignUp () {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit ({ name, email, password }) {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <>
      <img src={logo} alt='Go Barber' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='name' type='text' placeholder='Nome completo' />
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>
          {loading ? 'Criando conta ...' : 'Criar conta'}
        </button>
        <Link to='/'>Já tenho conta</Link>
      </Form>
    </>
  )
}

export default SignUp
