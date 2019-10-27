import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, file_id, ...rest } = payload.data;

        const profile = {
            name,
            email,
            file_id,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');

        yield put(updateProfileSuccess(response.data));
    } catch (err) {
        Alert.alert('Erro ao atualizar', 'Confira os dados!');

        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
