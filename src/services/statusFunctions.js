import swal from 'sweetalert';
import {store} from '../store'
import {signOut} from '../store/modules/auth/actions'

const statusFunction = {
    '200': http200,
    '201': http201,
    '204': http204,
    '400': http400,
    '401': http401,
    '403': http403,
    '404': http404,
}

function http200(){
    return console.log('Ok')
}

function http201(){
    return console.log('Create')
}

function http204(){
    return console.log('No content')
}

function http400(error){
    console.log(error.response.data)

    return console.log('Bad request')
}

function http401(error){
    swal('Session expired!', "Please, signin again.","error");
    store.dispatch(signOut())
    console.log('Unauthorized')
}

function http403(){
    swal('Session expired!', "Please, signin again.","error");
    store.dispatch(signOut())
    console.log('Forbiden')
}

function http404(){
    return console.log('Not found')
}

export default statusFunction;