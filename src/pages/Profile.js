import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import Post from '../components/Post';

import api from '../services/api'

export default function Profile() {
    const [posts, setPosts] = useState(null)

    const {username} = useParams();
    console.log(username)

    useEffect(() => {
        const loadPosts = () => {
            api
                .get(`/post/posts/?status=2&user__username=${username}`)
                .then(response => setPosts(response.data.results))
                .catch(error => console.log(error))
        }
        loadPosts()
    }, [username])

    function renderPosts () {
        return posts.map((item, index) => {
            return (
                <div 
                    key={`post-${index}`} 
                    className='flex justify-center items-center w-full'>
                    <Post post={item}/>
                </div>
            )
        })
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <div className='flex flex-col w-full h-full justify-between items-center sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:gap-x-1 gap-y-4 md:gap-y-6 overflow-auto p-4'>
                {posts && renderPosts()}
            </div>
        </div>
    );
}
