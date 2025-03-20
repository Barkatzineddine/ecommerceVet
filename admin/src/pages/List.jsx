import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { rapportContext } from '@/contex/rapportContext'
import { useContext } from 'react'
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClipLoader from "react-spinners/ClipLoader";

const List = ({token}) => {

  const [list,setList] = useState(null)
  const {totalProducts, deliveredOrders,updateQuantity} = useContext(rapportContext)
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [color, setColor] = useState("#c586ac");

  const fetchList = async() =>{
    try{
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')

      if (response.data.success){
        setList(response.data.products)
        setLoading(false)
      }else{
        toast.error(response.data.message)
      }
      
    }catch(error){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const removeProduct = async(id) => {
    try{
      const response = await axios.post(backendUrl + '/api/product/remove',{id}, {headers:{token}})

      if (response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }

    }catch(error){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='relative'>
      <p className='mb-2'>All Products List</p>
      <div>Total Product: {totalProducts}</div>

      {!list? 

      <div className='flex w-full h-max justify-center items-center'>
      
        <ClipLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      :
        <>
        <Stack className='my-2 absolute right-2 top-0' spacing={2} sx={{ width: 200 }}>
      
          <Autocomplete
            className=''
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={list.map((item,index) => item.name)}          
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={e=>setSearch(e.target.value)}
                label="Search input"
                slotProps={{
                input: {
                  ...params.InputProps,
                  type: 'search',
                },
            }}
          />
          )}
        />
        </Stack>
      <div className='flex flex-col gap-2 mt-7'>
        {/* ------------ List Table 1 ---------------- */}

        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Product List ------- */}

        {
          list.filter((item,index)=>search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())).map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="ItemImg" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.sellingPrice} {currency}</p>
              <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity}/>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }

      </div>
      </>}
    </div>
  )
}

export default List