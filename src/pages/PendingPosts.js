import React from 'react';

import Base from '../components/Base';

export default function Home() {
    return (
        <Base endpoint="/post/posts/?status=1"/>
    );
}
