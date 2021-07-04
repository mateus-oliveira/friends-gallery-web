import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ImBlocked} from 'react-icons/im'
import { FiPlusSquare } from 'react-icons/fi';
import ProfileDropDown from './ProfileDropdown';

export default function Header() {
    const user = useSelector(state => state.user)
    return (
        <header className='flex w-screen justify-center items-center bg-blue-blue1 '>
            <div className='flex w-full max-w-mwMax h-14 px-10 items-center justify-between text-white'>
                <Link to='/home'>
                    <strong className='text-lg'>Friends Gallery</strong>
                </Link>
                <div className="flex h-full items-center justify-center">
                    <Link to='/add-post'>
                        <FiPlusSquare className='cursor-pointer text-2xl mr-2'/>
                    </Link>
                    {user.role === 1 && (
                        <Link to='/pending-posts'>
                            <ImBlocked className='cursor-pointer text-xl mr-2'/>
                        </Link>
                    )}
                    <ProfileDropDown />
                </div>
            </div>
        </header>
    );
}
