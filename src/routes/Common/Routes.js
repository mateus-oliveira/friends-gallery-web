import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';

const Home = lazy(() => import('../../pages/Home'));
export default function Married () {

    const auth = useSelector(state => state.auth)
    const authFactor = auth?.signed

    return (
        <>
            <PrivateRoutes  path="/home" auth={authFactor} component={Home}/>
        </>
    )
} 