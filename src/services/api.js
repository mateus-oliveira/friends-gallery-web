import axios from 'axios';
import statusHttp from './statusHttp';
import {store} from '../store';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL})

api.interceptors.request.use(async (config) => {
    const access = store.getState().auth.access
    if(access){
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

api.interceptors.response.use(
    response => {
        statusHttp[response.status]()
        return response;  
    }, 
    error => {
        statusHttp[error.response.status](error)
        throw error; 
    },
)

export default api;