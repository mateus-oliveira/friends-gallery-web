import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropDown from './ProfileDropdown';

export default function Header() {
    return (
        <header className='flex w-full h-14 px-10 bg-blue-blue1 items-center justify-between text-white'>
            <Link to='/home'>
                <strong className='text-lg'>Friends Gallery</strong>
            </Link>
            <div className="h-full items-center justify-center">
                <ProfileDropDown />
            </div>
        </header>
    );
}
