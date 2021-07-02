import produce from 'immer';

const local = JSON.parse(localStorage.getItem('persist:gallery'));

const INITIAL_STATE = {
    access: local ? JSON.parse(local.auth).access : null,
    refresh: local ? JSON.parse(local.auth).refresh : null,
    signed: local ? JSON.parse(local.auth).signed : null,
    loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCCESS': {
                draft.access = action.payload.access;
                draft.refresh = action.payload.refresh;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.access = null;
                draft.refresh = null;
                draft.signed = false;
                break;
            }
            default:
        }
    });
}
