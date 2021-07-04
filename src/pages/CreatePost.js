import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {MdAddAPhoto} from 'react-icons/md'
import swal from 'sweetalert';

import Header from '../components/Header';

import api from '../services/api'
import apiFile from '../services/apiFile'

export default function CreatePost() {
    const user = useSelector((state) => state.user)

    const inputRef = useRef();

    const [imgUrl, setImgUrl] = useState(null)
    const [imgProfileId, setImgProfileId] = useState()
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)

    function uploadImage(img){
        const formData = new FormData()

        formData.append ('file', img)

        return apiFile
            .post('/asset/assets/', formData)
            .then(response => setImgProfileId(response.data.id))
            .catch(error => console.log(error))
    }

    function post(event){
        event.preventDefault();
        setLoading(true)

        const body = {
            'asset': imgProfileId,
            'user': user.id,
            'caption': caption,
        }

        api 
            .post(`/post/posts/`, body)
            .then(_ => {
                swal("That's ok!", 'Post registered, wait the married validation', 'success');
            })
            .catch(_ => swal('Error!', "Post don't registered.", 'error'))
            .finally(() => {
                setLoading(false);
                setCaption('')
                setImgUrl(null);
                setImgProfileId();
            })
    }

    return (
        <div className='w-screen h-screen'>
            <Header />
            <div className='flex flex-col w-screen max-w-mwMax h-screen justify-center items-center'>
                <div className='bg-blue-blue1 rounded flex flex-col items-center justify-center px-5 py-6 w-w400 h-h400'>
                    <form className='flex flex-col justify-between items-center h-full' onSubmit={post}>
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
                                className='h-h200 text-white cursor-pointer rounded-full' 
                                src={imgUrl} 
                                alt="Profile"/> :
                            <MdAddAPhoto 
                                onClick={() => inputRef.current.click()}
                                className='h-h200 text-9xl text-white cursor-pointer'/>}
                        <div className='flex flex-col w-full h-h200 justify-end items-center'>
                            <input 
                                type='text'
                                className='mb-2'
                                placeholder='Caption'
                                onChange={text => setCaption(text.target.value)}
                                value={caption}
                                required
                            />
                            <button 
                                type='submit'
                                className='mb-4 bg-blue-blue2 w-full h-10 text-white'>
                                {loading ? 'Loading...' : 'Share'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
