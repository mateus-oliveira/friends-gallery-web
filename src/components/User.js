import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import api from '../services/api';
import apiFile from '../services/apiFile';
import { realoadUserRequest } from '../store/modules/user/actions';

export default function User({username, count}) {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const me = useSelector(state => state.user)

    const inputRef = useRef()

    useEffect(()=> {
        api
            .get(`/authentication/users/?username=${username}`)
            .then(response => setUser(response.data.results[0]))
            .catch(error => console.log(error))
    }, [username])

    async function uploadImage(img){
        const formData = new FormData()

        formData.append ('file', img)

        return apiFile
            .post('/asset/assets/', formData)
            .then(response => {
                api
                    .patch(`/authentication/users/${me.id}/`, {asset: response.data.id})
                    .then(_ => dispatch(realoadUserRequest(me.id)))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    return (
            <div className='flex flex-col w-full my-8 justify-center items-center '>
                {user && (
                <>
                    {me.username === username ? (
                        <>
                            <input 
                                ref={inputRef}
                                type='file' 
                                className="hidden" 
                                accept="image/*"
                                onChange={e => uploadImage(e.target.files[0])}
                            />
                            {user?.asset?.file ? 
                                <img 
                                    onClick={() => inputRef.current.click()}
                                    className="h-full w-40 rounded-full mr-2 cursor-pointer bg-white" src={user?.asset?.file} alt={user?.username} /> :
                                <FaRegUserCircle 
                                    onClick={() => inputRef.current.click()}
                                    className="h-full text-9xl mr-2 text-blue-blue2 cursor-pointer"/>}
                        </>
                    ) : (
                        <>
                            {user?.asset?.file ? 
                                <img className="h-full w-40 rounded-full mr-2 bg-white" src={user?.asset?.file} alt={user?.username} /> :
                                <FaRegUserCircle className="h-full text-9xl mr-2 text-blue-blue2"/>}
                        </>
                    )}
                    
                    <strong className='mt-6'>{username}, {count} posts</strong>
                    <strong className='mt-2'>{user.first_name} {user.last_name}</strong>
                </>
            )}
        </div>
    )
}


