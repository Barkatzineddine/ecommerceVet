import mongoose from 'mongoose'


const ratingSchema = new mongoose.Schema({

    userId:   {type: String, required: true},
    productId: {type: String, required: true},
    rating:   {type:Number, required:true, default:0}
    
})

const ratingModel = mongoose.models.rating || mongoose.model("rating",ratingSchema)

export default ratingModel

