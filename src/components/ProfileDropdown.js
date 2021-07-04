import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { signOut } from '../store/modules/auth/actions';

import { FaRegUserCircle } from 'react-icons/fa';

export default function ProfileDropDown(){
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    return(
        <div 
            className="z-50 w-44 h-full relative inline-block text-left flex justify-center items-center"            
            onMouseEnter={() => setIsOpen(true)} 
            onMouseLeave={() => setIsOpen(false)} >
            <div>
                <button 
                    value={isOpen} 
                    type="button" 
                    className="flex items-center text-sm rounded-full" 
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true">
                    {user?.image?.file_low ? 
                        <img className="h-full w-8 rounded-full mr-2 bg-white" src={user?.image?.file_low} alt={user?.username} /> :
                        <FaRegUserCircle className="h-full w-8 mr-2"/>
                    }
                    {user?.username}
                </button>
                
                <div 
                    className={(isOpen ? "block " : "hidden ") + "origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white focus:outline-none"} 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="options-menu">
                    <div className="py-1" role="none">
                        <Link 
                            to="/profile" 
                            className="block text-black px-4 py-2 text-sm hover:bg-gray-gray3" 
                            role="menuitem">
                            Profile
                        </Link>
                    </div>
                    <div className="py-1" role="none">
                        <button 
                            onClick={() => dispatch(signOut())} 
                            className="block text-black px-4 py-2 text-sm hover:bg-gray-gray3 w-full flex justify-start" 
                            role="menuitem">
                            Sair
                        </button>
                    </div>
                </div>       
            </div>        
        </div>
    );
}