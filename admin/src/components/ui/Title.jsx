import React from 'react'

const Title = ({text}) => {
  return (
    <div className='w-fit'>

        <h1 className='text-4xl text-[#C586A5]'>{text}</h1>
        <hr className='border-t-2 border-[#C586A5] my-4' />

    </div>
  )
}

export default Title