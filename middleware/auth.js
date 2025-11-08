const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
exports.authenticate=async(req,res,next)=>{
    try{
        console.log('234')
const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 

const user=await jwt.verify(token,process.env.JWT);
req.user=user;
 next(); 
 
    }
catch(err){
    console.log(err);
    return res.status(500).json({message:'auth error'})
}
}