import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// function for add product
const addProduct = async (req,res) => {
    try{
        console.log("body :",req.body)
        console.log('files :',req.files)
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body
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
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        console.log(name,description,price,category,subCategory,sizes,bestseller)
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

export {listProducts,addProduct,removeProduct,singleProduct}

