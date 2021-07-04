import React,{ useEffect, useState } from 'react';

import Header from './Header';
import User from './User';
import Post from './Post';
import Pagination from './Pagination';

import api from '../services/api'

export default function Base({endpoint, username}) {
    const [posts, setPosts] = useState(null)
    const [count, setCount] = useState(0)
    const [next, setNext] = useState(false)
    const [previous, setPrevious] = useState(false)
    const [page, setPage] = useState(0)
    const pageLimit = 20;

    useEffect(() => {
        const loadPosts = () => {
            api
                .get(`${endpoint}&limit=${pageLimit}`)
                .then(response => {
                    setPrevious(response.data.previous)
                    setNext(response.data.next)
                    setCount(response.data.count)
                    setPosts(response.data.results);
                })
                .catch(error => console.log(error))
        }
        loadPosts()
    }, [endpoint])

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

    function reloadPosts(nextOrPrevious){
        setPage(nextOrPrevious ? page + 1 : page -1)
        const offset = (nextOrPrevious ? page + 1 : page -1) * pageLimit
        api
        .get(`${endpoint}&limit=${pageLimit}&offset=${offset}`)
        .then(response => {
            setPrevious(response.data.previous)
            setNext(response.data.next)
            setPosts(response.data.results)
        })
        .catch((error) => console.log(error))
    }

    function goToPage(p){
        setPage(p)
        const offset = p * pageLimit
        api
        .get(`${endpoint}&limit=${pageLimit}&offset=${offset}`)
        .then(response => {
            setPrevious(response.data.previous)
            setNext(response.data.next)
            setPosts(response.data.results)
        })
        .catch((error) => console.log(error))
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center items-center'>
            <Header />
            <div className='flex flex-col h-h93/100 w-full max-w-mwMax items-center'>
                {username && <User username={username} count={count} />}
                <Pagination 
                    next={next} 
                    previous={previous} 
                    reload={reloadPosts} 
                    totalItems={count} 
                    pageLimit={pageLimit} 
                    goToPage={goToPage} 
                    page={page}
                    width='w-wtable'/>
                <div className='flex flex-col w-full h-full justify-between items-center sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:gap-x-1 gap-y-4 md:gap-y-6 p-4'>
                    {posts && renderPosts()}
                </div>
            </div>
        </div>
    );
}
