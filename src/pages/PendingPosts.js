import React,{ useEffect, useState } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';

import api from '../services/api'

export default function PendingHosts() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const loadPosts = () => {
            api
                .get('/post/posts/?status=1')
                .then(response => setPosts(response.data.results))
                .catch(error => console.log(error))
        }
        loadPosts()
    }, [])

    function checkPost(id, check) {
        api
            .patch(`/post/posts/${id}/to-approve/`, {status: check ? 2 : 3})
            .then(_ => {
                let memo = [...posts];
                const index = memo.findIndex(item => item.id === id);
                if (index > -1) {
                    memo.splice(index, 1)
                    setPosts([...memo]);
                }
            })
            .catch(error => console.log(error))
    }

    function renderPosts () {
        return posts.map((item, index) => {
            return (
                <div 
                    key={`post-${index}`} 
                    className='flex justify-center items-center w-full'>
                    <Post post={item} checkPost={checkPost}/>
                </div>
            )
        })
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center items-center'>
            <Header />
            <div className='flex flex-col h-h93/100 w-full max-w-mwMax justify-center items-center'>
                <div className='flex flex-col w-full h-full justify-between items-center sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:gap-x-1 gap-y-4 md:gap-y-6 overflow-auto p-4'>
                    {posts && renderPosts()}
                </div>
            </div>
        </div>
    );
}
