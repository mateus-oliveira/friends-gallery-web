export function singInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {email, password},
    };
}

export function singInSuccess(refresh, access, id, username, role, email, image, company) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {refresh, access, id, username, role, email, image, company},
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
