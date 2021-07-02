import {all, call, put, takeLatest} from 'redux-saga/effects';
import Reducers from '../../../constants/Reducers';

import api from '../../../services/api';

import {singInSuccess, signFailure} from './actions';


export function* signIn({payload}) {
    try {
        const {email, password} = payload;

        const response = yield call(api.post, '/authentication/login/', {
            email,
            password,
        });
        

        yield put(singInSuccess(response.data));

    } catch (error) {
        yield put(signFailure());
    }
}

export default all([
    takeLatest(Reducers.AUTH_SIGN_IN_REQUEST, signIn),
]);
