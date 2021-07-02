import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';

import {singInSuccess, signFailure} from './actions';


export function* signIn({payload}) {
    try {
        const {email, password} = payload;

        const response = yield call(api.post, '/authentication/login/', {
            email,
            password,
        });
        
        const {id, refresh, access, username, role, image} = response.data;
        

        yield put(singInSuccess(
            id,
            refresh, 
            access,
            username,
            role,
            email,
            image,
        ));

    } catch (error) {
        yield put(signFailure());
    }
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
