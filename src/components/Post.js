import React , { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaRegComments, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import api from '../services/api';
import PostModal from './PostModal';
import { Link } from 'react-router-dom';

export default function Post({post}) {
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(post.likes.length)

    const user = useSelector(state => state.user);
    
    const [liked, setLiked] = useState(post.likes.filter(item => item.username === user.username).length > 0)
    
    function like () {
        setLikes(liked ? likes - 1 : likes + 1)
        setLiked(!liked)
        api
            .post(`/post/posts/${post.id}/like/`, {})
            .then(() => {})
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className='flex flex-col text-blue-blue2 cursor-pointer w-60 justify-center items-center bg-white p-4 rounded'>
                <Link 
                    className='flex justify-items-start items-center w-full mb-2'
                    to={`/profile/${post.user.username}`}>
                    {post.user?.asset?.file ? 
                        <img className="h-full w-6 rounded-full mr-2" src={post.user?.asset?.file} alt={post.user?.username} /> :
                        <FaRegUserCircle className="h-full w-6 mr-2"/>
                    }
                    <strong>{post.user.username}</strong>
                </Link>
                <img 
                    src={post.asset.file} alt={post.caption} 
                    className='h-h200 w-full mb-2 border-t-2 border-b-2'
                    onClick={() => setShowModal(true)}/>
                <strong className='mb-4'>{post.caption}</strong>
                <div>
                    <button onClick={like}>
                        {liked ? 
                            <FaHeart className="h-full w-6 mr-2"/> :
                            <FaRegHeart className="h-full w-6 mr-2"/>}
                    </button>
                    <button onClick={() => setShowModal(true)}>
                        <FaRegComments className="h-full w-6 mr-2"/>
                    </button>
                </div>
            </div>
            {showModal && ( 
                <PostModal 
                    post={post} 
                    like={like}
                    liked={liked}
                    likes={likes}
                    close={() => setShowModal(false)}
                />
            )}
        </>
    );
}