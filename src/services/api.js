import axios from 'axios';
import statusFunction from './statusFunctions';
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
        statusFunction[response.status]()
        return response;  
    }, 
    error => {
        statusFunction[error.response.status](error)
        throw error; 
    },
)

export default api;