import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

import icon from '../assets/bgIcon.png'
import api from '../services/api';

export default function ForgetPassword() {
    const [loading, setLoading] = useState('')
    const [email, setEmail] = useState('')

    function forgetPassword(event){
        event.preventDefault();
        setLoading(true)

        api
            .post('/authentication/reset-password/', {email})
            .then(_ => {
                swal(
                    "That's ok!", 
                    "You are received an email with the instructions to redefine your password.",
                    "success",
                )
            })
            .catch(error => console.log(error))
            .finally(_ => {
                setLoading(false);
                setEmail('');
            })
    }

    return (
        <div className='bg-blue-blue1 rounded flex flex-col items-center justify-center px-5 py-6 w-w300'>
            <img
                className='h-h100'
                alt='Friends Gallery'
                src={icon} 
            />
            <form className='flex flex-col' onSubmit={forgetPassword}>
                <input 
                    type="text" 
                    className='mb-2'
                    placeholder='Email'
                    onChange={text => setEmail(text.target.value)}
                    value={email}
                    required
                />
                <button 
                    type='submit'
                    className='mb-4 bg-blue-blue2 w-full h-10 text-white'>
                    {loading ? 'Loading...' : 'Send'}
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
