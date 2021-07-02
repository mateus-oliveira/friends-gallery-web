import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';

const PendingPosts = lazy(() => import('../../pages/Married/PendingPosts'));
export default function Married () {

    const auth = useSelector(state => state.auth)
    const user = useSelector(state=> state.user)
    const authFactor = auth?.signed && user?.role === 1

    return (
        <>
            <PrivateRoutes exact path="/pending-posts" auth={authFactor} component={PendingPosts}/>
        </>
    )
} 