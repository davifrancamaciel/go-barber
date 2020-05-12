import produce from 'immer'
import { INITIAL_STATE, AUTH_SIGN_IN_SUCCESS } from '~/constants/Auth'

export default function auth (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_SUCCESS:
      return produce(state, draft => {
        draft.token = action.payload.token
        draft.signed = true
      })
    default:
      return state
  }
}
