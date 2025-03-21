import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../context/ShopContext';
import starIcon from '../assets/starIcon.svg'
import starDullIcon from '../assets/starDullIcon.svg'
import RelatedProduct from '../components/RelatedProduct';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "../index.css"


// import required modules
import { Navigation } from 'swiper/modules';


const Product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart,backendUrl,token,ratings} = useContext(shopContext)
  const [productData,setProductData] = useState(false)
  const [size,setSize] = useState('')
  const [maxScrollImagesHeight,setMaxScrollImagesHeight] = useState(null)
  const [rating,setRating] = useState(0)
  const [ratingNumber,setRatingNumber] = useState(0)
  const [indexImage,setIndexImage] = useState(0)
  const swiperRef = useRef(null);

  // Function to go to the clicked image
  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const fetchProductData = async() =>{

    products.map((item)=>{
      if(item._id === productId){
      
        setProductData(item)
        
        return null
     }
    })
  }

  const setRatingHandler = async(rating,productId)=>{

    try{

      const response = await axios.post(backendUrl + '/api/product/rating',{ratingValue:rating,productId},{headers:{token}})
      if (response.data.success){    
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }

    }catch(error){

      console.log(error)
      toast.error("An Error Has Occured ")

    }
    
  }

  const calculateRating = async()=>{

    const productRatings = ratings.filter(r => r.productId === productId);
    if (productRatings.length === 0){
        setRating(0);
        setRatingNumber(0)
        return 0;
    }
    const total = productRatings.reduce((sum, r) => sum + r.rating, 0);
    setRating(total / productRatings.length)
    setRatingNumber(productRatings.length)
  }
  
  const handleSlideChange = (swiper) => {
    setIndexImage(swiper.activeIndex)
    console.log(swiper.activeIndex)
  };

 

  useEffect(()=>{
    fetchProductData();
    calculateRating()
  },[productId,products])



  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className=' flex-1 max-w-[700px] min-w-0 flex flex-col-reverse gap-3 sm:flex-row '>

          <div className={`max-h-[${maxScrollImagesHeight}] flex sm:flex-col overflow-x-auto overflow-y-scroll  sm:justify-normal sm:w-[22%] w-full`}>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>goToSlide(index)} key={index} src={item} alt="image" className={`${indexImage == index?"border-orange-500 border-2":""} w-[23%] mx-auto aspect-[171/192] justify-center h-auto sm:w-full mr-auto sm:mb-3 flex-shrink-0 cursor-pointer  object-cover`}/>
              ))
            }
          </div>

          <div className='w-full sm:w-[78%] max-w-[600px]'> 
       

          <Swiper navigation={true} modules={[Navigation]} className="mySwiper min-w-0 "
          
          
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          >


          {
              productData.image.map((item,index)=>(
                <SwiperSlide className='min-w-0 h-[100%]'>
                    
                  <img onClick={()=>setImage(item)} key={index} src={item} alt={`Slide ${index}`} className='w-full min-w-0 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer h-[100%] object-cover aspect-[9/12]'  />

                </SwiperSlide>
              ))
            }  
       
          </Swiper>
          
          

          </div>

        </div>
            {/*--------------- Product Info  ------------------- */}
        <div className='flex-1 text-base md:text-sm lg:text-lg'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
            
              <Stack spacing={1}>
                <Rating
                  name="half-rating" 
                  size='large'
                  value={rating} 
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRatingHandler(newValue,productData._id)
                    setRating(newValue);
                  }} 
                />
              </Stack>

              <p className='pl-2'>({ratingNumber})</p>

            </div>
            <p className='mt-5 text-3xl font-medium'>{productData.sellingPrice} {currency}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.shortDescription}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ?'border-orange-500' :'' }`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' >ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original product.</p>
                <p>Cash on delivery is available onthis product.</p>
                <p>Easy return and axchange policy within 7 days.</p>
            </div>
        </div>
      </div>

      {/*--------------------- Description & Review Section -------------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'> Description</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.longDescription}</p>
        </div>
      </div>

      {/*----------------------Display related Products ------------------------- */}

      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
      
     

    </div>
    
  ) : <div className='opacity-0'></div>
}

export default Product