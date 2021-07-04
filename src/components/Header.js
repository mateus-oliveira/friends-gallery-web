import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropDown from './ProfileDropdown';

export default function Header() {
    return (
        <header className='w-screen  flex justify-center items-center bg-blue-blue1 '>
            <div className='flex w-full max-w-mwMax h-14 px-10 items-center justify-between text-white'>
                <Link to='/home'>
                    <strong className='text-lg'>Friends Gallery</strong>
                </Link>
                <div className="h-full items-center justify-center">
                    <ProfileDropDown />
                </div>
            </div>
        </header>
    );
}
