import express from "express"
import {placeOrder, allOrders, userOrders, updateStatus,deleteOrder,DeliveredOrders} from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/listDelivered',adminAuth,DeliveredOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',placeOrder)



// User Features
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/delete',adminAuth,deleteOrder)

export default orderRouter