import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

import { singInRequest } from '../store/modules/auth/actions';

import icon from '../assets/bgIcon.png'

export default function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector((state) => state.auth)

    function signIn(event){
        event.preventDefault();
        dispatch(singInRequest(email, password));
    }

    return (
        <div className='bg-blue-blue1 rounded flex flex-col items-center justify-center px-5 py-6 w-w300'>
            <img
                className='h-h100'
                alt='Friends Gallery'
                src={icon} 
            />
            <form className='flex flex-col' onSubmit={signIn}>
                <input 
                    type='text'
                    className='mb-2'
                    placeholder='Email'
                    onChange={mail => setEmail(mail.target.value)}
                    value={email}
                    required
                />
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
                    {auth.loading ? 'Loading...' : 'Sign In'}
                </button>

                <hr/>

                <Link 
                    to='/signup' 
                    className='mt-4 flex w-full justify-center items-center text-white'>
                    Sign Up
                </Link>

                <Link 
                    to='/redefine-password' 
                    className='mt-4 flex w-full justify-center items-center text-white'>
                    Forget Password
                </Link>

            </form>
        </div>
    );
}
