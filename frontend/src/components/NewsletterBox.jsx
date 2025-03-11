import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) =>{
    event.preventDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-meium text-gray-800'>subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse recusandae maxime a.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
        <input type="email" className='w-full sm:flex-1 outline-none' placeholder='enter your email'/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox