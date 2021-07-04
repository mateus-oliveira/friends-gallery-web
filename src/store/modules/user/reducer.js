import produce from 'immer';
import Reducers from '../../../constants/Reducers';

const local = JSON.parse(localStorage.getItem(Reducers.PERSIST_LOCAL_STORAGE));

const INITIAL_STATE = {
    id: local ? JSON.parse(local.user).id : null,
    username: local ? JSON.parse(local.user).username : null,
    email: local ? JSON.parse(local.user).email : null,
    role: local ? JSON.parse(local.user).role : null,
    image: local ? JSON.parse(local.user).image : null
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Reducers.AUTH_SIGN_IN_SUCCESS: {
                draft.id = action.payload.data.id;
                draft.username = action.payload.data.username;
                draft.email = action.payload.data.email;
                draft.role = action.payload.data.role;
                draft.image = action.payload.data.image;
                break;
            }
            case Reducers.USER_RELOAD_SUCCESS: {
                draft.id = action.payload.data.id;
                draft.username = action.payload.data.username;
                draft.email = action.payload.data.email;
                draft.role = action.payload.data.role;
                draft.image = action.payload.data.asset;
                break;
            }
            case Reducers.AUTH_SIGN_OUT: {
                draft.id = null;
                draft.username = null;
                draft.email = null;
                draft.role = null;
                draft.image = null;
                break;
            }
            default:
        }
    });
}
