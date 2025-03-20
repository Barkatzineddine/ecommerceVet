import jwt from 'jsonwebtoken'

const isLogeIn = async(req,res,next) => {
    try{
        const { token } = req.headers
        if(!token){
            return res.json({success:false,message:"Not Loged in"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        res.json({success:true,message:"Authorized To Access"})
        
    }catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}

export default isLogeIn;



