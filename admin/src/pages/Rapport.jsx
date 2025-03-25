import React, { useState ,useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import Title from '@/components/ui/Title'
import Analysis from '@/components/ui/Analysis'
import {backendUrl, currency} from '../App'
import { assets } from '../assets/assets'
import { rapportContext } from '../contex/rapportContext'
import { BarChart, Bar, ResponsiveContainer,XAxis, YAxis,Tooltip } from 'recharts';


const Rapport = ({token}) => {

    const {totalProducts, deliveredOrders} = useContext(rapportContext)
    const [date, setDate] = useState(new Date())
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth()+1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    const [revenus, setRevenus] = useState(0)
    const [filteredOrders, setFilterOrders] = useState([])
    const [itemCounts,setItemCounts] = useState({})
    const [chartData,setChartData] = useState({})
 

    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    
    const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i); 

   
      const getRevenus = async (month, year) =>{
        if (!token){
            return null;
        } 
        try{

              var totalAmount = 0
              var totalPurchaseAmount = 0
              const filteredOrders = deliveredOrders.map((order,index)=>{
              const date = new Date(order.date)
              const year = date.getFullYear()            
              const month = date.getMonth() + 1
              if(year == selectedYear && month == selectedMonth ){
             
                return order
              }
            })
              setFilterOrders(filteredOrders)
              totalAmount = filteredOrders.reduce((sum, order) => order?sum + order.amount:0, 0); 
              totalPurchaseAmount = filteredOrders.reduce((sum, order) => order?sum + order.purchaseAmount:0, 0); 
              setRevenus(totalAmount - totalPurchaseAmount)
              var newItemCounts = {};
              filteredOrders.forEach(order => {

                  if(order){order.items.forEach(item => {
                  newItemCounts[item.name] = (newItemCounts[item.name] || 0) + item.quantity;
                })}else{
                  newItemCounts ={}
                };
              });
              setItemCounts(newItemCounts); 
            
        }catch(error){
          console.log(error)
          toast.error(error.message)
        }  
      }

      
    


      useEffect(()=>{
        getRevenus()
        const newChartData = Object.keys(itemCounts).map(name => ({
          name,
          quantity: itemCounts[name]
        }));
        setChartData(newChartData)
        console.log("from useEffect")
      },[selectedMonth,selectedYear,token,deliveredOrders])

      useEffect(()=>{
    
        const newChartData = Object.keys(itemCounts).map(name => ({
          name,
          quantity: itemCounts[name]
        }));
        setChartData(newChartData)
      },[filteredOrders])

      




  return (
    <div className='relative'>
        <Title text="Rapport Page:"/>
        <div className='absolute right-2 top-2'>


          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}  className='p-2 font-semibold bg-white mr-2 cursor-pointer'>
            <option value="">Select Month</option>
            {months.map((month, index) => (
            <option key={index} value={index+1}>{month}</option>
            ))}
          </select>


          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className='p-2 font-semibold bg-white cursor-pointer'>
            <option value="">Select Year</option>
            {years.map((year) => (
            <option key={year} value={year}>{year}</option>
            ))}
          </select>

        </div>

        <Analysis currency={currency} totalRevenus={revenus} totalProduct={totalProducts} totalSales={filteredOrders.filter(order => order !== undefined).length}/>
           


      <h2 className='text-3xl text-indigo-700 border-b-2 my-10 w-fit'>Bar Chart :</h2>

      <div className='h-[550px] mt-10 mb-5 p-10 bg-white rounded-lg'>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={100} height={40} data={chartData}>
        <XAxis className='text-sm' dataKey="name" />
        <YAxis allowDecimals={false} tickFormatter={(value) => Math.round(value)}  />
          <Tooltip />
          <Bar  barSize={70} dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      </div>
        
        
        
       
        
        {  

            filteredOrders.map((order,index)=>(
              order?
              <div className='relative grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                  <img className='w-12' src={assets.parcel_icon} alt="parcel" />
                  <div>
                  <div>
                    {order.items.map((item,index)=>{

                      if (index === order.items.length - 1){

                        return <p  className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>

                      }else{

                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>


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
                
              </div>:null
            )
            
          )
          }
    </div>
  )
}

export default Rapport