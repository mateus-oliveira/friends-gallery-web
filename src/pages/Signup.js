import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import {MdAddAPhoto} from 'react-icons/md'
import swal from 'sweetalert';

import { singInRequest } from '../store/modules/auth/actions';
import api from '../services/api';
import apiFile from '../services/apiFile';

export default function Signup() {
    const dispatch = useDispatch();

    const inputRef = useRef();

    const [imgUrl, setImgUrl] = useState(null)
    const [imgProfileId, setImgProfileId] = useState()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector((state) => state.auth)

  
    function signUp(event){
        event.preventDefault();

        const body = {
            'asset': imgProfileId,
            'email': email,
            'username': username,
            'first_name': firstName,
            'last_name': lastName,
            'role': 2,
            'password': password,
        }

        api 
            .post(`/authentication/users/`, body)
            .then(response => {
                swal("That's ok!", 'User registered', 'success')
                console.log(response.data)
                dispatch(singInRequest(email, password));
            })
            .catch(_ => swal('Error!', "User don't registered.", 'error'))
    }

    function uploadImage(img){
        const formData = new FormData()

        formData.append ('file', img)

        return apiFile
            .post('/asset/assets/', formData)
            .then(response => setImgProfileId(response.data.id))
            .catch(error => console.log(error))
    }

    return (
        <div className='bg-blue-blue1 rounded flex flex-col items-center justify-center px-5 py-6 w-w300'>
           <form className='flex flex-col justify-center items-center' onSubmit={signUp}>
                <input 
                    ref={inputRef}
                    type='file' 
                    className="hidden" 
                    accept="image/*"
                    onChange={e => {
                        setImgUrl(URL.createObjectURL(e.target.files[0])); 
                        uploadImage(e.target.files[0]);
                    }}
                />
                {imgUrl ? 
                    <img 
                        onClick={() => inputRef.current.click()}
                        className='h-h100 text-white cursor-pointer mb-2 rounded-full' 
                        src={imgUrl} 
                        alt="Profile"/> :
                    <MdAddAPhoto 
                        onClick={() => inputRef.current.click()}
                        className='h-h100 text-9xl text-white cursor-pointer mb-2'/>}
                <input 
                    type='text'
                    className='mb-2'
                    placeholder='Email'
                    onChange={text => setEmail(text.target.value)}
                    value={email}
                    required
                />
                <input 
                    type='text'
                    className='mb-2'
                    placeholder='Username'
                    onChange={text => setUsername(text.target.value)}
                    value={username}
                    required
                />
                <input 
                    type='text'
                    className='mb-2'
                    placeholder='First Name'
                    onChange={text => setFirstName(text.target.value)}
                    value={firstName}
                    required
                />
                <input 
                    type='text'
                    className='mb-2'
                    placeholder='Last Name'
                    onChange={text => setLastName(text.target.value)}
                    value={lastName}
                    required
                />
                <input 
                    type="password" 
                    className='mb-2'
                    placeholder='Password'
                    onChange={text => setPassword(text.target.value)}
                    value={password}
                    required
                />
                <button 
                    type='submit'
                    className='mb-4 bg-blue-blue2 w-full h-10 text-white'>
                    {auth.loading ? 'Loading...' : 'Sign Up'}
                </button>

                <hr className='w-full'/>

                <Link 
                    to='/' 
                    className='mt-4 flex w-full justify-center items-center text-white'>
                    Sign In
                </Link>

            </form>
        </div>
    );
}
