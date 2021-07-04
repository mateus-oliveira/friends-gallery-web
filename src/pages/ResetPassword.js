import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import swal from 'sweetalert';

import icon from '../assets/bgIcon.png'
import api from '../services/api';

export default function ResetPassword() {
    const {token} = useParams();

    const [loading, setLoading] = useState('')
    const [password, setPassword] = useState('')

    function resetPassword(event){
        event.preventDefault();
        setLoading(true)

        console.log({
            token, 
            password,
        })

        api
            .post('/authentication/reset-password/confirm/', {
                token, 
                password,
            })
            .then(_ => {
                swal(
                    "That's ok!", 
                    "Your password are reseted.",
                    "success",
                )
            })
            .catch(error => console.log(error.response.data, error.message))
            .finally(_ => {
                setLoading(false);
                setPassword('');
            })
    }

    return (
        <div className='bg-blue-blue1 rounded flex flex-col items-center justify-center px-5 py-6 w-w300'>
            <img
                className='h-h100'
                alt='Friends Gallery'
                src={icon} 
            />
            <form className='flex flex-col' onSubmit={resetPassword}>
                <input 
                    type="password" 
                    className='mb-2'
                    placeholder='Password'
                    onChange={pwd => setPassword(pwd.target.value)}
                    value={password}
                    required
                />
                <button 
                    type='submit'
                    className='mb-4 bg-blue-blue2 w-full h-10 text-white'>
                    {loading ? 'Loading...' : 'Reset'}
                </button>

                <hr/>

                <Link 
                    to='/' 
                    className='mt-4 flex w-full justify-center items-center text-white'>
                    Sign In
                </Link>

            </form>
        </div>
    );
}
