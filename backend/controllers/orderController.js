import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
// Placing orders using COD Method

const placeOrder = async (req,res) => {

    try{
     
        const {userId, items, amount, address,purchaseAmount} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            purchaseAmount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})
        

    }catch(error){

        console.log(error)
        res.json({success:false,message:error.message})

    }

}

// All Orders data for Admin Panel

const allOrders = async (req,res) =>{

    try{

        const orders = await orderModel.find({})
        res.json({success:true,orders})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const DeliveredOrders = async (req,res) =>{

    try{

        const orders = await orderModel.find({status:"Delivered"})
        res.json({success:true,orders})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order data For Frontend

const userOrders = async (req,res) =>{

    try{

        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Update Order Status

const updateStatus = async (req,res) =>{

    try{

        const { orderId ,status } = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const deleteOrder = async (req,res) => {

    try{
        
        const {orderId} = req.body
        console.log(orderId)
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:true,message:'order deleted'})


    }catch(error){  
        
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


export {placeOrder, allOrders, userOrders, updateStatus,deleteOrder, DeliveredOrders}
