import swal from 'sweetalert';
import {store} from '../store';
import {signOut} from '../store/modules/auth/actions';

const statusHttp = {
    200: http200,
    201: http201,
    202: http202,
    204: http204,
    400: http400,
    401: http401,
    403: http403,
    404: http404,
    413: http413,
    500: http500,
    503: http503,
};

function http200() {}
function http201() {}
function http202() {}
function http204() {}

function http400(error) {
    swal(
        'Operation error!',
        'Please try again or contact support.',
        'error',
    );
}

function http401(error) {
    if (error.response.config.url === '/authentication/login/') {
        swal(
            'Authentication error!',
            "Please try again or click 'Forgot password'.",
            'error',
        );
    } else {
        swal(
            'Expired session!',
            'Please, sign in again.',
            'error',
        );
    }
    store.dispatch(signOut());
}

function http403() {
    swal(
        'Operation forbidden!',
        'You do not have permission to access this function..',
        'error',
    );
    store.dispatch(signOut());
}

function http404() {
    swal(
        'Operation not found!',
        "This operation don't exists.",
        'error',
    );
}

function http413() {
    swal(
        'Upload not released!',
        'Please, upload a file with maximum size 20MB.',
        'error',
    );
}

function http500() {
    swal(
        'Server error!',
        'This error should not be happening, please contact support.',
        'error',
    );
}

function http503() {
    swal(
        'Server down!',
        'Please wait a moment and try again. If the problem persists, contact support.',
        'error',
    );
}

export default statusHttp;
