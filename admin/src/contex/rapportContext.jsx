import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'
import {backendUrl, currency} from '../App'
import { assets } from '../assets/assets'


export const rapportContext = createContext();

const RapportContextProvider = (props) => {

    const [deliveredOrders, setDeliveredOrders] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [token,setToken] = useState("")

    const navigate = useNavigate(); 

    const fetchAllDeliveredOrders = async () =>{
        if (!token){
          return null;
        } 
        try{
          const response = await axios.post(backendUrl + '/api/order/listDelivered',{},{headers:{token}})
          if(response.data.success){
            setDeliveredOrders(response.data.orders)
          }else{
            toast.error(response.data.message)  
          }        
        }catch(error){
          console.log(error.message)
          toast.error("an error has occured")
        }  
      }

      const getTotalProducts = async() =>{
        try{
    
          const response = await axios.get(backendUrl + '/api/product/list')
    
          if (response.data.success){
            setTotalProducts(response.data.products.length)
          }else{
            toast.error(response.data.message)
          }
          
        }catch(error){
          console.log(error.message)
          toast.error(error.message)
        }
      }

      const updateQuantity = async (itemId,quantity) => {



        if (token) {
            try{

                const response = await axios.post(backendUrl + '/api/product/update',{itemId,quantity}, {headers:{token}})
                if (response.data.success){
                  toast.success("Product Quantity Updated")
                }else{
                  toast.error(response.data.message)
                }


            }catch(error){

                console.log(error)
                toast.error(error.message)

            }
        }
    }

      

      useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
         
        }
        },[])


      useEffect(()=>{
        fetchAllDeliveredOrders()
        getTotalProducts()
      },[token])


    const value = {
       token,totalProducts,deliveredOrders,updateQuantity
    }

    return(
        <rapportContext.Provider value={value}>
            {props.children}
        </rapportContext.Provider>
    )
}


export default RapportContextProvider;

