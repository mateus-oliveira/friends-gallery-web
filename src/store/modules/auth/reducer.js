import produce from 'immer';
import Reducers from '../../../constants/Reducers';

const local = JSON.parse(localStorage.getItem(Reducers.PERSIST_LOCAL_STORAGE));

const INITIAL_STATE = {
    access: local ? JSON.parse(local.auth).access : null,
    refresh: local ? JSON.parse(local.auth).refresh : null,
    signed: local ? JSON.parse(local.auth).signed : null,
    loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Reducers.AUTH_SIGN_IN_REQUEST: {
                draft.loading = true;
                break;
            }
            case Reducers.AUTH_SIGN_IN_SUCCESS: {
                draft.access = action.payload.data.access;
                draft.refresh = action.payload.data.refresh;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case Reducers.AUTH_SIGN_IN_FAILURE: {
                draft.loading = false;
                break;
            }
            case Reducers.AUTH_SIGN_OUT: {
                draft.access = null;
                draft.refresh = null;
                draft.signed = false;
                break;
            }
            default:
        }
    });
}
