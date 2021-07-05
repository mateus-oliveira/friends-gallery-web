import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../../pages/Home'));
const Profile = lazy(() => import('../../pages/Profile'));
const CreatePost = lazy(() => import('../../pages/CreatePost'));

export default function Married () {
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const authFactor = auth?.signed

    return (
        <>
            <PrivateRoute  path="/home" auth={authFactor} component={Home}/>
            <PrivateRoute exact path="/profile" auth={authFactor} component={() => <Redirect to={`/profile/${user.username}`} />}/>
            <PrivateRoute  path="/profile/:username" auth={authFactor} component={Profile}/>
            <PrivateRoute  path="/add-post" auth={authFactor} component={CreatePost}/>
        </>
    )
} 