import express from 'express'
import {listProducts,addProduct,removeProduct,singleProduct,setRating,updateProductQuantity,updateProductPrice,onPromotion,setPromoPrice} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProducts)
productRouter.post('/rating',authUser,setRating)
productRouter.post('/updateQuantity',adminAuth,updateProductQuantity)
productRouter.post('/updatePrice',adminAuth,updateProductPrice)
productRouter.post('/onPromotion',adminAuth,onPromotion)
productRouter.post('/setPromoPrice',adminAuth,setPromoPrice)

export default productRouter