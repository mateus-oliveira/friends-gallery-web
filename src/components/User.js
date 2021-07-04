import React, {useEffect, useState} from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import api from '../services/api';

export default function User({username, count}) {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        api
            .get(`/authentication/users/?username=${username}`)
            .then(response => setUser(response.data.results[0]))
            .catch(error => console.log(error))
    }, [username])

    return (
            <div className='flex flex-col w-full my-8 justify-center items-center '>
                {user && (
                <>
                    {user?.asset?.file ? 
                        <img className="h-full w-40 rounded-full mr-2" src={user?.asset?.file} alt={user?.username} /> :
                        <FaRegUserCircle className="h-full text-9xl mr-2 text-blue-blue2"/>
                    }
                    <strong className='mt-6'>{username}, {count} posts</strong>
                </>
            )}
        </div>
    )
}