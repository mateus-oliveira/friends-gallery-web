import React,{ useEffect, useState } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';

import api from '../services/api'

export default function Home() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const loadPosts = () => {
            api
                .get('/post/posts/?status=2')
                .then(response => setPosts(response.data.results))
                .catch(error => console.log(error))
        }
        loadPosts()
    }, [])

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