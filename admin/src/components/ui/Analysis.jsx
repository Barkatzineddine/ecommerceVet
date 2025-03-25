import React from 'react'

const Analysis = ({currency,totalRevenus,totalSales,totalProduct}) => {



  return (
    <div className='grid grid-cols-3 rounded-lg  bg-white py-5'>
      <div className='flex flex-col justify-center items-center p-10'>
        <h1 className='text-2xl '>{totalRevenus} {currency}</h1>
        <span className='text-[#8A92A6]'>Earned This Month</span>
      </div>
      <div className='flex flex-col justify-center items-center p-10 border-x-2'>
        <h1 className='text-2xl '>{totalSales}</h1>
        <span className='text-[#8A92A6]'>Total Sales</span>      
      </div>
      <div className='flex flex-col justify-center items-center p-10'>
        <h1 className='text-2xl '>{totalProduct}</h1>
        <span className='text-[#8A92A6]'>Total Products</span>
      </div>
    </div>
  )
}

export default Analysis