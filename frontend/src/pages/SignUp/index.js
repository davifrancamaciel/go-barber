import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import logo from '~/assets/logo.svg'

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
  function handleSubmit (data) {
    console.log(data)
  }

  return (
    <>
      <img src={logo} alt='Go Barber' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='name' type='text' placeholder='Nome completo' />
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>Acessar</button>
        <Link to='/'>Já tenho conta</Link>
      </Form>
    </>
  )
}

export default SignUp
