import { all, takeLatest, call, put } from 'redux-saga/effects'

import { AUTH_SIGN_IN_REQUEST } from '~/constants/Auth'
import {signInSuccess} from './actions'
import history from '~/services/history'
import api from '~/services/api'

export function * signIn ({ payload }) {
  const { email, password } = payload

  const response = yield call(api.post, '/sessions', {
    email,
    password
  })

  const {token, user} = response.data;

  if(!user.provider){
      console.tron.log('Usuario não é prestador')
      return;
  }

  yield put (signInSuccess(token,user))

  history.push('/dashboard')
}

export default all([takeLatest(AUTH_SIGN_IN_REQUEST, signIn)])
