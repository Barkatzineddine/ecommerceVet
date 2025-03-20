import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import shoppingIcon from '../assets/shoppingIcon.png'

const ProductItem = ({id,image,name,sellingPrice,category,productId}) => {
  
    const [totalRating,setTotalRating] = useState(0)
    const {currency,ratings} = useContext(shopContext)
  

    const getTotalRating = async()=>{
      const productRatings = ratings.filter(r => r.productId === productId);
      if (productRatings.length === 0){
          setTotalRating(0);
          return 0;
      }
      const total = productRatings.reduce((sum, r) => sum + r.rating, 0);
      setTotalRating(total / productRatings.length)
    }

    useEffect(()=>{
      getTotalRating()
    },[])


  return (
    
    <Link className='relative shadow-md rounded-[25px] text-gray-700 cursor-pointer px-[10px] pt-[10px] pb-[12px] border-slate-200 border-solid border-[1px]  hover:scale-110 transition ease-in-out' to={`/product/${id}`}>
        <div>
            <img className='w-full rounded-[20px] object-cover aspect-[171/192] h-full  ' src={image[0]} alt={`${name}`} />
        </div>
        <p className='pt-1 pb-1 pl-1 r text-xs text-slate-400 font-semibold '>{category}</p>
        <p className='p pl-1 text-xs  lg: font-extrabold'>{name}</p>
        <Stack spacing={1}>
          <Rating name="half-rating-read" size='small' value={totalRating} precision={0.5} readOnly />
        </Stack>
        <p className='text-sm  pt-1  font-semibold pl-1'> {sellingPrice} {currency}</p>
        {/*<div className="rounded-full p-2 w-fit absolute bottom-1 right-2 cursor-pointer hover:bg-slate-200"> 
          <img src={shoppingIcon} alt="shopingIcon" className='w-4' />
        </div>*/}
    </Link>
  )
}

export default ProductItem