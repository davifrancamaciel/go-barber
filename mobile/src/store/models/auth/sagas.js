import {all, takeLatest, call, put} from 'redux-saga/effects'
import {Alert} from 'react-native'

import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_OUT,
} from '~/constants/Auth'
import {signInSuccess, signFailure} from './actions'
// import history from '~/services/history'
import api from '~/services/api'

export function * signIn ({payload}) {
  try {
    const {email, password} = payload
    
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    })
    
    const {token, user} = response.data

    if (user.provider) {
      Alert.alert('Erro no login', 'Usuario pode ser prestador de serviços.')
      return
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    // history.push('/dashboard')
  } catch (error) {
    Alert.alert('Falha no login', 'Usuario não encontrado.')
    alert('Falha no login Usuario não encontrado.')
    yield put(signFailure())
  }
}

export function * signUp ({payload}) {
  try {
    const {name, email, password} = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
    })

    // history.push('/')
  } catch (error) {
    if (error.error) Alert.alert('Erro no login', error.error)
    else
      Alert.alert('Falha no cadastro', 'Falha no cadastro verifique seus dados')
    yield put(signFailure())
  }
}
function setToken ({payload}) {
  if (!payload) return

  const {token} = payload.auth

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}

function signOut () {
  // history.push('/')
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AUTH_SIGN_IN_REQUEST, signIn),
  takeLatest(AUTH_SIGN_UP_REQUEST, signUp),
  takeLatest(AUTH_SIGN_OUT, signOut),
])
