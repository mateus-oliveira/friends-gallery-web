import Reducers from "../../../constants/Reducers";

export function realoadUserRequest(idUser) {
    return {
        type: Reducers.USER_RELOAD_REQUEST,
        payload: {idUser},
    };
}

export function realoadUserSuccess(data) {
    return {
        type: Reducers.USER_RELOAD_SUCCESS,
        payload: {data},
    };
}