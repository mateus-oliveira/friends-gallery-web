import React ,{ useEffect, useState } from "react";
import {FiSend, FiXCircle} from 'react-icons/fi'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function PostModal({post, close}) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(null)

    const user = useSelector(state => state.user)

    useEffect(()=> {
        const loadComments = () => {
            api.get(`/post/comments/?post=${post.id}`)
                .then(response => setComments(response.data.results))
                .catch(error => console.log(error))
        }
        loadComments()
    }, [post])

    function renderComments() {
        return comments.map((item, index) => {
            return (
                <div className='mb-2'>
                    <Link to={`/profile/${item.user.username}`}>
                        <strong className='font-semibold'>{item.user.username}: </strong>
                    </Link>
                    <strong className='font-normal'>"{item.text}"</strong>
                </div>
            )
        })
    }

    function postComment(e){
        e.preventDefault();

        api
            .post('/post/comments/', {
                post: post.id,
                user: user.id,
                text: comment,
            })
            .then(response => setComments([...comments, response.data]))
            .catch(error => console.log(error))
            .finally(() => setComment(''))
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-4 bg-blue-blue1 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-white bg-blue-blue1">
                                Postted by{' '}
                                <Link to={`/profile/${post.user.username}`}>
                                    {post.user.username}
                                </Link>
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-white opacity-8 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={close}>
                                <span className="bg-transparent text-white opacity-8 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    <FiXCircle />
                                </span>
                            </button>
                        </div>
                        
                        <div className="flex relative p-6 flex-col md:flex-row justify-center items-center">
                            <img 
                                src={post.asset.file} alt={post.caption} 
                                className='w-40 md:w-1/2'/>

                            <div className='w-1/2 '>
                            <div className='mb-2 text-lg'>
                                <Link to={`/profile/${post.user.username}`}>
                                    <strong className='font-semibold'>
                                        {post.user.username}: 
                                    </strong>
                                </Link>
                                <strong className='font-normal'>"{post.caption}"</strong>
                            </div>
                                <div className='overflow-auto mb-2 flex w-full justify-center items-center'>
                                    {comments ?
                                        <div className='h-80 w-full'>
                                            {renderComments()}
                                        </div> :
                                        <label>Loading...</label>
                                    }
                                </div>
                                <form 
                                    onSubmit={postComment} 
                                    className="flex " >
                                    <input 
                                        className='border-0'
                                        placeholder='Your Comment...'
                                        onChange={text => setComment(text.target.value)}
                                        value={comment}
                                        required
                                    />
                                    <button type='submit'>
                                        <FiSend className="h-full w-6 mr-2 text-blue-blue2"/>
                                    </button>
                                </form>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
    );
}