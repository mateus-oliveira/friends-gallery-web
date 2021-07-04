import axios from 'axios';
import statusHttp from './statusHttp';
import {store} from '../store';

const apiFile = axios.create({baseURL: process.env.REACT_APP_API_URL})

apiFile.interceptors.request.use(async (config) => {
    const access = store.getState().auth.access
    config.headers['Content-Type'] = 'multipart/form-data'
    config.headers.Accept = '*/*'
    if(access){
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

apiFile.interceptors.response.use(
    response => {
        statusHttp[response.status]()
        return response;  
    }, 
    error => {
        statusHttp[error.response.status](error)
        throw error; 
    },
)

export default apiFile;