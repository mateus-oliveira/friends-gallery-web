import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import Married from './Married/Routes';
import Common from './Common/Routes';

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

export default function Routes(){
    const auth = useSelector(state => state.auth);

    return(
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route 
                        exact
                        path="/" component={
                            auth?.signed ? 
                                () => <Redirect to='/home'/> : 
                                Login
                            }
                    />
                    <Route 
                        path="/signup" 
                        component={
                            auth?.signed ? 
                                () => <Redirect to='/home'/> : 
                                Signup
                            }
                    />
                    
                    <Common />
                    {/* <Married /> */}
                </Suspense>
            </Switch>
        </BrowserRouter>
    );
}