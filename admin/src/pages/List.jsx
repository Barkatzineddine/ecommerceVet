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
import Title from '@/components/ui/Title'
import Swal from 'sweetalert2'
import updateIcon from '../assets/update.png'
import Pagination from '@/components/Pagination'

const List = ({token}) => {

  const [list,setList] = useState([])
  const {totalProducts, deliveredOrders,updateQuantity,updatePrice,setPromoPrice} = useContext(rapportContext)
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(20);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [color, setColor] = useState("#c586ac");
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = search.length>0?list:list.slice(indexOfFirstPost,indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
 

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
        toast.error("Error removing product")
        throw new Error(response.data.message)
        
      }

    }catch(error){
      console.error(error.message)
      throw new Error(response.data.message)
    }
  }

  const handlePromotion = async(e,id) => {
    try{

      setLoading(true)
      const checked = e.target.checked;
      const response = await axios.post(backendUrl + '/api/product/onPromotion',{checked,id}, {headers:{token}})      
      setLoading(false)

    }catch(error){
      setLoading(false)
      console.error(error.message)
      throw new Error(response.data.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[loading])

 

  return (
    <>
    <div className='relative'>
      
      <Title text={"Products List Page:"}/>
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

        <div className='hidden text-xs md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 md:text-sm'>
          <b className='p-2'>Image</b>
          <b className='p-2'>Name</b>
          <b className=''>Category</b>
          <b className='p-2'>Price</b>
          <b className='p-2'>Quantity</b>
          <b className='p-2'>on Promotion</b>
          <b className='p-2'>Promo Price</b>
          <b className='text-center p-2'>Action</b>

        </div>

        {/* ------ Product List ------- */}

        {
          currentPosts.filter((item,index)=>search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())).map((item,index)=>(

            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="ItemImg" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p><img className='inline w-4 mr-1 rounded-full cursor-pointer' src={updateIcon} alt="update"
                onClick={()=>{
                  Swal.fire({
                    title: "Enter The New Price",
                    input: "number",
                    inputAttributes: {
                      autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    showLoaderOnConfirm: true,
                    preConfirm: async (price) => {
                        setLoading(true)
                        const response = await updatePrice(item._id,Number(price));
                        return response;
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    setLoading(false)
                    if (result?.value?.data?.success) {
                      Swal.fire({
                        title: "Updated!",
                        text: "Your Price Has Been Updated.",
                        icon: "success"
                      });
                      
                    }
                  })
                }}
              />{item.sellingPrice} {currency}</p>
              <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity}/>
              <p className='flex justify-start px-5'>
                <input
                  className='block'
                  type="checkbox"
                  checked={item.onPromotion}
                  onChange={(e)=>handlePromotion(e,item._id)}
                />
              </p>

              <p><img className='inline w-4 mr-1 rounded-full cursor-pointer' src={updateIcon} alt="update"
                onClick={()=>{
                  Swal.fire({
                    title: "Enter The Promotion Price",
                    input: "number",
                    inputAttributes: {
                      autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    showLoaderOnConfirm: true,
                    preConfirm: async (price) => {
                        setLoading(true)
                        const response = await setPromoPrice(item._id,Number(price));
                        return response;
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    setLoading(false)
                    if (result?.value?.data?.success) {
                      Swal.fire({
                        title: "Updated!",
                        text: "Your Promo Price Has Been Updated.",
                        icon: "success"
                      });
                      
                    }
                  })
                }}
              />{item.promotionPrice} {currency}</p>

              
              <p onClick={async ()=>{
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    removeProduct(item._id)
                      .then(() => {
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                      })                
                  }
                });
                //removeProduct(item._id)
                }} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                
            </div>
      
          ))
        }
        <Pagination postsPerPage={postsPerPage} 
                    totalPosts={search.length>0
                                ?currentPosts.filter((item,index)=>search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())).length
                                :list.length} 
                    paginate={paginate}/>

      </div>
      </>}
    </div>
    </>
  )
}

export default List