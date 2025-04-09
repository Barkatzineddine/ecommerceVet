import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Title from '@/components/ui/Title'
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2'


const Orders = ({token}) => {

  const [orders,setOrders] = useState(null)
  const [date, setDate] = useState(new Date())
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [color, setColor] = useState("#c586ac");
  const navigate = useNavigate()


  const fetchAllOrders = async () =>{

    if (!token){
      return null;
    }

    try{
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      var filteredOrders
      if(response.data.success){
        if(date !== null){
          filteredOrders = response.data.orders.map((order,index)=>{
          const orderDate = new Date(order.date)
          const orderYear = orderDate.getFullYear()
          const orderDay =  orderDate.getDate()
          const orderMonth = orderDate.getMonth() + 1
          if( orderYear == date.getFullYear() && orderMonth == date.getMonth()+1 && orderDay == date.getDate() ){
            return order
          }
        })
      }else{
        filteredOrders = response.data.orders
        }

        filteredOrders = filteredOrders.filter( order => order !== undefined)
        setOrders(filteredOrders)
        setLoading(false)
      }else{
        toast.error(response.data.message)

      }
      
    }catch(error){
      console.log(error.message)
      toast.error("an error has occured")
    }

  }

  const statusHandler = async (event, orderId) =>{
    try{

      const response = await axios.post(backendUrl + '/api/order/status', {orderId,status:event.target.value}, {headers: {token}})
      if (response.data.success){
        await fetchAllOrders()
      }

    }catch(error){
      console.log(error)
      toast.error("an error has occured")
    }
  }

  const deleteOrder = async(e,orderId)=>{
    try{

      const response = await axios.post(backendUrl + '/api/order/delete', {orderId}, {headers: {token}})
      if(response.data.success){
        toast.success("order deleted")
        fetchAllOrders()
      }else{
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

    }catch(error){
      console.log(error)
      toast.error("an error has occured")
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token,date])

  return (
    <div className='relative'>
        <Title text={"Orders Page:"}/>
        <Popover>
                <PopoverTrigger asChild>
                 
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                         "text-neutral-950"
                        
                      )}
                    >    
                    {date !== null?        
                        <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                        :
                        <span>Pick a Date</span>
                    } 
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
               
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
          </Popover>
          {orders?
          <>
    
          <Stack className='my-2 absolute right-2 top-0' spacing={2} sx={{ width: 200 }}>
      
               <Autocomplete
                 className=''
                  freeSolo
                  id="free-solo-2-demo"
                  onInputChange={(e,newValue)=>setSearch(newValue)}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  disableClearable
                  options={orders.map((order) => ({ label: order.address.firstName + " " + order.address.lastName,id: order._id}))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      onChange={e=>setSearch(e.target.value)}
                      onSelect={(e) => setDate(null)}
                      slotProps={{
                      input: {
                        ...params?.InputProps,
                        type: 'search',
                      },
                      key:{params}
                  }}
               />
                )}
              />
          </Stack>
          
        <div>
          {
            orders.filter((item,index)=>search.toLowerCase() === '' ? item : (item.address.firstName.toLowerCase()+" "+item.address.lastName.toLowerCase()).includes(search.toLowerCase())).map((order,index)=>(
              order?
              <div className='relative grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id}>
                  <img className='w-12' src={assets.parcel_icon} alt="parcel" />
                  <div>
                  <div>
                    {order.items.map((item,index)=>{

                      if (index === order.items.length - 1){

                        return <p className='py-0.5' key={item._id}>{item.name} x {item.quantity} <span>{item.size}</span> </p>

                      }else{

                        <p className='py-0.5' key={item._id}>{item.name} x {item.quantity} <span>{item.size}</span> </p>

                      }

                    })}
                  </div>
                  <p className='mt-3 mb-2 font-medium' >{order.address.firstName + " " + order.address.lastName}</p>

                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                  </div>

                  <p>{order.address.phone}</p>

                </div>

                <div>
                  <p className='text-sm sm:text-[15px]' >items : {order.items.length}</p>
                  <p className='mt-3' >Method : {order.paymentMethod}</p>
                  <p>Payment : { order.payment ? 'Done' : "Pending" }</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>

                <p className='text-sm sm:text-[15px]' >{order.amount} {currency}</p>

                <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 mt-6 font-semibold bg-white'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
                <div className='absolute right-1 top-2 w-fit'>
                  <div className='flex justify-between items-center'>
                    <img onClick={async (e)=>{
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
                            deleteOrder(e,order._id)
                              .then(() => {
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your file has been deleted.",
                                  icon: "success"
                                });
                              })                
                          }
                        });                       
                        }}
                      
                       src={assets.remove_icon} alt="cancel" className='w-[28px] ml-2 p-1 rounded-full cursor-pointer hover:bg-slate-300'/>
                  </div>
                  
                </div>
                
              </div>:null
            ))
          }
        </div>
        </>
        :
        <div className='flex w-full h-[100vh] justify-center items-center'>
    
          <ClipLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
       </div>
        }
    </div>
  )
}

export default Orders