import Reducers from "../../../constants/Reducers";

export function singInRequest(email, password) {
    return {
        type: Reducers.AUTH_SIGN_IN_REQUEST,
        payload: {email, password},
    };
}

export function singInSuccess(data) {
    return {
        type: Reducers.AUTH_SIGN_IN_SUCCESS,
        payload: {data},
    };
}

export function signFailure() {
    return {
        type: Reducers.AUTH_SIGN_IN_FAILURE,
    };
}

export function signOut() {
    return {
        type: Reducers.AUTH_SIGN_OUT,
    };
}
