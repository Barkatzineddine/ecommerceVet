import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import userModel from "../models/userModel.js";
import ratingModel from '../models/ratingModel.js';
import validator from 'validator';
// function for add product
const addProduct = async (req,res) => {
    try{
        console.log("body :",req.body)
        console.log('files :',req.files)
        const {name,shortDescription,longDescription,sellingPrice,purchasePrice,category,subCategory,sizes,bestseller,quantity} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            shortDescription,
            longDescription,
            category,
            sellingPrice: Number(sellingPrice),
            purchasePrice: Number(purchasePrice),
            quantity: Number(quantity),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        console.log(name,sellingPrice,purchasePrice,category,subCategory,sizes,bestseller)
        console.log(imagesUrl)

        res.json({success:true,message:"Product Added"})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// function for list product
const listProducts = async (req,res) =>{

    try{

        const products = await productModel.find({})
        res.json({success:true,products})

    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}

//function for removing product
const removeProduct = async (req,res) =>{

    try{
        if(req.body.id){
            const deletedProduct = await productModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"Product Removed"})
        }else{
            throw new Error("No id provided")
        }

    }catch(error){
        console.log(error)
        res.json({success: false, message:"Error deleting the product"})
    }

}

//function for single product info
const singleProduct = async (req,res) =>{

    try{
        const { productId } = req.body

        if(!productId) return res.json({success:false,message:"No product id provided"})

        const product = await productModel.findById(productId)
        
        if(product){
            return res.json({success:true,product})
        }else{
            throw new Error("No Product Found")
        }
    }catch(error){
        console.log(error.message)
        res.json({success: false, message:"No product Found"})
    }
}

//Update products

const updateProduct = async(req,res)=>{

    try{

        const {itemId,quantity} = req.body

        await productModel.findByIdAndUpdate(itemId,{quantity})

        res.json({success: true, message: "Product Quantity Updated"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// function to set a rating for a product from a client logged in
const setRating= async (req,res) =>{

    try{

        const {ratingValue,userId,productId} = req.body
        const user = await userModel.findById(userId)
        const product = await productModel.findById(productId)
        const existingRating = await ratingModel.findOne({ userId, productId });
        if(existingRating){

            res.json({success:false, message:"You Have already Rated This Product "})

        }else{

        console.log(user)
        console.log(product)
        const rating = new ratingModel({userId,productId,rating:ratingValue})
        await rating.save()
        res.json({success:true, message:"Your Rating has been Added "})
        }

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }

   /* try{
        if(req.body.id){
            const deletedProduct = await productModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"Product Removed"})
        }else{
            throw new Error("No id provided")
        }

    }catch(error){
        console.log(error)
        res.json({success: false, message:"Error deleting the product"})
    }*/

}

export {listProducts,addProduct,removeProduct,singleProduct,setRating, updateProduct}

