import jwt from 'jsonwebtoken'

const isAdmin = async(req,res,next) => {
    try{
        const { token } = req.headers
        if(!token){
            return res.json({success:false,message:"Not Loged in"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        if (token_decode !== process.env.ADMIN_EMAIL){
            return res.json({success:false,message:"Not authorized as admin"})
        }
        res.json({success:true,message:"Authorized as admin"})
    }catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}

export default isAdmin;



