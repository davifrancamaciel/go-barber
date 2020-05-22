import { all, takeLatest, put, call } from 'redux-saga/effects'
import { Alert } from 'react-native'

import { USER_UPDATE_PROFILE_REQUEST } from '~/constants/User'
import api from '~/services/api'
import { updateProfileFailure, updateProfileSuccess } from './actions'

export function * updateProfile ({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, 'users', profile)
    Alert.alert('Sucesso!','Perfil alterado com sucesso.')

    yield put(updateProfileSuccess(response.data))
  } catch (error) {
    Alert.alert('Erro!','Erro ao alterar perfil')
    yield put(updateProfileFailure())
  }
}
export default all([takeLatest(USER_UPDATE_PROFILE_REQUEST, updateProfile)])
