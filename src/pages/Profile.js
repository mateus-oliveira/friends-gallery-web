import React from 'react';
import { useParams } from 'react-router-dom';
import Base from '../components/Base';

export default function Profile() {
    const {username} = useParams();

    return (
        <Base endpoint={`/post/posts/?status=2&user__username=${username}`} username={username}/>
    );
}
