const jwt = require ('jsonwebtoken');
const User = require ('../models/User');
const errorResponse =require('../utils/errorResponse');


exports.protect = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //Bearer token
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token){
        return next (new errorResponse ("Not authorized to access this route", 401));
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);  // returns id and token
        const user =await User.findById(decoded.id);

        if (!user){
            return next(new errorResponse("No user was found with this id",404));
        }
        //use it in other routes
        req.user=user;
        next();
    }catch (err){
        return next(new errorResponse("Not authorized yo access this route",401));
    }

}