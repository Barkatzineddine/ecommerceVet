import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import Title from '@/components/ui/Title'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [longDescription,setLongDescription] = useState("")
  const [shortDescription,setShortDescription] = useState("")
  const [purchasePrice,setPurchasePrice] = useState(0)
  const [sellingPrice,setSellingPrice] = useState(0)
  const [quantity,setQuantity] = useState(0)
  const [category,setCategory] = useState("Men")
  const [subCategory,setSubCategory] = useState("Topwear")
  const [bestseller,setBestseller] = useState(false)
  const [sizes,setSizes] = useState([])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#c586ac");

  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    try{

      setLoading(true)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("quantity", quantity)
      formData.append("shortDescription",shortDescription)
      formData.append("longDescription",longDescription)
      formData.append("sellingPrice", sellingPrice)
      formData.append("purchasePrice", purchasePrice)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append(("image1"), image1)
      image2 && formData.append(("image2"), image2)
      image3 && formData.append(("image3"), image3)
      image4 && formData.append(("image4"), image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if(response.data.success){
        setLoading(false)
        toast.success(response.data.message)
        setName('')
        setLongDescription("")
        setShortDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPurchasePrice('')
        setSellingPrice('')
        setQuantity('')
      }else{
        toast.error(response.data.message)
      }

    } catch (error){
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  return (
    <>
    <Title text={"Add Items Page:"}/>
    {
      loading?

      <div className='w-full h-[100vh] flex flex-row justify-center items-center'>

        <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        />

      </div>
    
      :
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="uploadImg" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
            </label>

            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="uploadImg" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
            </label>

            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="uploadImg" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
            </label>

            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="uploadImg" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product short description</p>
          <textarea onChange={(e)=>setShortDescription(e.target.value)} value={shortDescription} className='w-full max-w[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product long description</p>
          <textarea onChange={(e)=>setLongDescription(e.target.value)} value={longDescription} className='w-full max-w[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div className='flex flex-col flex-wrap sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2 '>Product category</p>
            <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2 sm:w-[140px]'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2 '>Sub category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full  px-3 py-2 sm:w-[120px]'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Selling Price</p>
            <input onChange={(e)=>setSellingPrice(e.target.value)} value={sellingPrice} className='w-full px-3 py-2 sm:w-[130px]' type="Number" placeholder='25' />
          </div>  

          <div>
            <p className='mb-2'>Purchase Price</p>
            <input onChange={(e)=>setPurchasePrice(e.target.value)} value={purchasePrice} className='w-full px-3 py-2 sm:w-[130px]' type="Number" placeholder='25' />
          </div>      

          <div>
            <p className='mb-2'>Stock Quantity</p>
            <input onChange={(e)=>setQuantity(e.target.value)} value={quantity} className='w-full px-3 py-2 sm:w-[130px]' type="Number" placeholder='25' />
          </div>  
        </div>

        <div>
            <p className='mb-2'>Product Sizes</p>
            <div className='flex gap-1'>
              <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
                <p className={` ${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
                <p className={` ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
                <p className={` ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
                <p className={` ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
                <p className={` ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
              </div>
            </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
    }
    </>
  )
}

export default Add