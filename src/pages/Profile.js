import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import User from '../components/User';
import Post from '../components/Post';

import api from '../services/api'

export default function Profile() {
    const [posts, setPosts] = useState(null)
    const [count, setCount] = useState(0)

    const {username} = useParams();

    useEffect(() => {
        const loadPosts = () => {
            api
                .get(`/post/posts/?status=2&user__username=${username}`)
                .then(response => {
                    setPosts(response.data.results);
                    setCount(response.data.count)
                })
                .catch(error => console.log(error))
        }
        loadPosts()
    }, [username])

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
            <div className='flex flex-col h-h93/100 w-full max-w-mwMax items-center'>
                <User username={username} count={count} />
                <div className='flex flex-col w-full h-full justify-between items-center sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:gap-x-1 gap-y-4 md:gap-y-6 p-4'>
                    {posts && renderPosts()}
                </div>
            </div>
        </div>
    );
}
