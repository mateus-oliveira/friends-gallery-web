import {all, call, put, takeLatest} from 'redux-saga/effects';
import swal from 'sweetalert';
import Reducers from '../../../constants/Reducers';

import api from '../../../services/api';

import {realoadUserSuccess} from './actions';


export function* reloadUser({payload}) {
    try {
        const {idUser} = payload;
        const response = yield call(api.get, `/authentication/users/${idUser}/`);
        yield put(realoadUserSuccess(response.data));
    } catch (error) {
        swal('Error!', 'Unable to edit user.', 'error')
    }
}

export default all([
    takeLatest(Reducers.USER_RELOAD_REQUEST, reloadUser),
]);
