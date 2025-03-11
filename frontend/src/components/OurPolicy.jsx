import React from 'react'
import exchangeIcon from '../assets/exchangeIcon.svg'
import qualityIcon from '../assets/qualityIcon.svg'
import supportIcon from '../assets/supportIcon.svg'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20
        text-xs sm:text-sm md:text-base text-gray-700'>

            <div>
                <img src={exchangeIcon} alt="exchange" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Easy Exchange Policy </p>
                <p> We offer hassle free exchange policy</p>
            </div>

            <div>
                <img src={qualityIcon} alt="exchange" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>7 Days Return Policy </p>
                <p> We provide 7 days free return policy</p>
            </div>

            <div>
                <img src={supportIcon} alt="exchange" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Best customer support </p>
                <p> We provide 24/7 customer support</p>
            </div>

    </div>
  )
}

export default OurPolicy