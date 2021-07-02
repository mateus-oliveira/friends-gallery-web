import React from 'react';
import ProfileDropDown from './ProfileDropdown';

export default function Header() {
    return (
        <header className='flex w-full h-12 px-10 bg-blue-blue1 items-center justify-between text-white'>
            <h3>Friends Gallery</h3>
            <div className="h-full items-center justify-center">
                <ProfileDropDown />
            </div>
        </header>
    );
}
