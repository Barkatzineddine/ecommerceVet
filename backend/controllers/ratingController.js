import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import ratingModel from '../models/ratingModel.js'
// Placing orders using COD Method


// function for list product
const listRatings = async (req,res) =>{

    try{

        const ratings = await ratingModel.find({})
        res.json({success:true,ratings})

    }catch(error){
        console.log(error)
        res.json({success:false ,message:error.message})
    }
}







export {listRatings}

