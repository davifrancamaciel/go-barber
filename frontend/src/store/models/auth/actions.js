import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_FAILURE
} from '~/constants/Auth'

export function signInRequest (email, password) {
  return {
    type: AUTH_SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signInSuccess (token, user) {
  return {
    type: AUTH_SIGN_IN_SUCCESS,
    payload: { token, user }
  }
}

export function signFailure () {
  return {
    type: AUTH_SIGN_FAILURE
  }
}
