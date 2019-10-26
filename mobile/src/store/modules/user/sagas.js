import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, oldPassword, avatar_id } = payload.data;
    const profile = oldPassword ? payload.data : { name, email, avatar_id };

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Perfil', 'Atualização bem sucedida');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro na atualização', 'verifique seus dados.');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
