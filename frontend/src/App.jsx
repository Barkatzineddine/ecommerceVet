import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import NotFound from './pages/NotFound'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PlaceOrder from './pages/PlaceOrder'
import { useContext,useState,useEffect } from 'react'
import { shopContext } from './context/ShopContext'
import axios from 'axios'


export default function App() {
  const {token,backendUrl} = useContext(shopContext);
  const [authorized,setAuthorized] = useState(false)

  const getAuthorization = async()=>{
    try{

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success){
        setAuthorized(true)
      }

    }catch(error)  {
      console.log(error.message)
      toast.error("an error has occured")
    }}
    

  useEffect(()=>{
    getAuthorization()
  },[token])

  return (
    <div className='px-4 sm:px-5 md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        {authorized?<Route path='/orders' element={<Orders/>}/>:null}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  )
}