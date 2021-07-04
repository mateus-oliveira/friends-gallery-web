import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const PendingPosts = lazy(() => import('../../pages/PendingPosts'));
export default function Married () {

    const auth = useSelector(state => state.auth)
    const user = useSelector(state=> state.user)
    const authFactor = auth?.signed && user?.role === 1

    return (
        <PrivateRoute path="/pending-posts" auth={authFactor} component={PendingPosts}/>
    )
} 