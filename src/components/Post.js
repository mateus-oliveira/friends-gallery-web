import React from 'react';

export default function Post({post}) {
    return (
        <div>
            <img src={post.asset.file} alt={post.caption} className='w-60 h-60'/>
            <strong>{post.caption}</strong>
        </div>
    );
}