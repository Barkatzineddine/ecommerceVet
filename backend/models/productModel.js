import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    longDescription: {type:String, required:true},
    shortDescription: {type:String, required:true},
    purchasePrice:{type:Number, required:true},
    sellingPrice:{type:Number, required:true},
    image:{type:Array, required:true},
    category:{type:String, required:true},
    subCategory:{type:String, required:true},
    sizes:{type:Array, required:true},
    bestseller:{type:Boolean},
    date:{type:Number, required:true},
    quantity:{type:Number, required:true, default:1},
    onPromotion:{type:Boolean,default:false},
    promotionPrice:{type:Number,default:0}
     
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel

