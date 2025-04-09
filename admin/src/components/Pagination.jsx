import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav className='flex justify-center h-fit'> 
            <ul className='flex rounded-sm w-fit h-fit border-2 border-pink-200'>
                {pageNumbers.map(number =>(

                    <li key={number} className='w-fit h-fit box-border'>
                        <a onClick={()=>paginate(number)} href="#" className={`block ${number==pageNumbers.length?"":'border-r-2'} px-4 py-2 border-pink-200 box-border`}>
                            {number}
                        </a>
                    </li>
      
                ))}
            </ul>
        </nav>
     )
}

export default Pagination