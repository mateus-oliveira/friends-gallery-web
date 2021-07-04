import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

export default function Pagination({previous, next, reload, totalItems, pageLimit, goToPage, page}){
    function left() {
        reload(false)
    }
    function right() {
        reload(true)
    }

    const [isOpen, setIsOpen] = useState(false)
    
    const pages = (Math.ceil(totalItems / pageLimit))
    const pagesArray = new Array(pages).fill(1).map((item, idx) => item + idx)
    
    function renderPages(){
        return pagesArray.map((item, index) => (
                <div key={`pagesArray-${index}`}>
                    <button onClick={() => goToPage(index)} className='block 
                    px-4 py-2 text-sm text-blue-blue2 w-full h-full flex justify-center' role='menuitem'>{item}</button>
                </div>
            ))
    }


    return(
        <div className=' bg-gray-gray2 px-4 py-3 flex items-center justify-between sm:px-6'>
            <div className='flex-1 flex justify-between sm:hidden'>
                <button 
                    id='previous' 
                    className='items-center px-4 py-2 border border-gray-300 text-2xl font-medium rounded-md bg-white text-blue-blue2' 
                    onClick={left}
                    disabled={!previous}>
                    <FiChevronLeft />
                </button>
                <button 
                    id='next' 
                    className='ml-3 items-center px-4 py-2 border border-gray-300 text-2xl font-medium rounded-md  bg-white text-blue-blue2' 
                    onClick={right}
                    disabled={!next}>
                    <FiChevronRight/>
                </button>
            </div>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div 
                    className='h-10 flex justify-center items-center relative z-0 inline-flex rounded-md shadow-sm border ' 
                    aria-label='Pagination'>
                    <button 
                        id='previous' 
                        className='flex h-full w-8 items-center justify-center items-center rounded-l-md border border-gray-300 bg-gray-graybg font-medium text-blue-blue2 bg-white' 
                        onClick={left}
                        disabled={!previous}>
                        <FiChevronLeft />
                    </button>

                    <div className='z-10 w-20 h-full relative inline-block text-left flex justify-center'
                        onMouseEnter={() => setIsOpen(true)} 
                        onMouseLeave={() => setIsOpen(false)} >
                        <button                         
                            type='button'
                            className='w-full h-full text-sm items-center justify-center border border-gray-300 bg-gray-graybg font-medium text-blue-blue2 bg-white' 
                            id='options-menu'
                            aria-expanded='true'
                            aria-haspopup='true'>
                            {page+1} / {pages}
                        </button>
                        <div 
                            className={`${isOpen ? "block " : "hidden "} origin-top-right border border-gray-300 absolute right-0 mt-10 w-full rounded-md shadow-lg bg-white text-blue-blue2 divide-white focus:outline-none`}
                            role='menu' 
                            aria-orientation='vertical' 
                            aria-labelledby='options-menu'>
                                <div className='py-1' role='none'>
                                    {renderPages()}
                                </div>
                        </div>
                    </div>

                    <button 
                        id='next' 
                        className='flex h-full w-8 items-center justify-center items-center rounded-r-md border border-gray-300 bg-gray-gray2 font-medium bg-white' 
                        onClick={right}
                        disabled={!next}>
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}