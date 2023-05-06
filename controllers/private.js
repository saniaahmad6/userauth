const jwt=require("jsonwebtoken");
const User=require("../models/User");
const errorResponse=require("../utils/errorResponse");

exports.getPrivateData = async (req,res,next) =>{

    
    const token = req.headers.authorization.split(" ")[1];

    const decoded=jwt.verify(token,process.env.JWT_SECRET);  // returns id and token
    const user =await User.findById(decoded.id);

    if (!user){
        return next(new errorResponse("No user was found with this id",404));
    }
    
    res.status(200).json({
        success : true,
        name : user.username,
        email : user.email
        
    })
}