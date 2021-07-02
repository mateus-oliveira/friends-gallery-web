import produce from 'immer';

const local = JSON.parse(localStorage.getItem('persist:gallery'));

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
            case '@auth/SIGN_IN_SUCCESS': {
                draft.id = action.payload.id;
                draft.username = action.payload.username;
                draft.email = action.payload.email;
                draft.role = action.payload.role;
                draft.image = action.payload.image;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.id = null;
                draft.username = null;
                draft.email = null;
                draft.role = null;
                draft.image = null;
                break;
            }
            case '@user/RELOAD_USER_SUCCESS': {
                draft.id = action.payload.id;
                draft.email = action.payload.email;
                draft.username = action.payload.username;
                draft.role = action.payload.role;
                draft.image = action.payload.asset;
                break;
            }
            default:
        }
    });
}
