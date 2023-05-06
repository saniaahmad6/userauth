const User=require("../models/User");
const errorResponse=require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto=require("crypto");


exports.register = async (req, res,next) =>{
    const { username,email,password}=req.body;

    try{
        const user =await User.create({
            username, email, password
        })
        

        sendToken(user,201,res);

    }catch(err){
        next(err);
    }
}

exports.login = async (req, res,next) =>{
    const {email,password} =req.body;
    if (!email || !password){
        return next(new errorResponse("Please Provide email and password",400))
    }

    try{
        const user=await User.findOne({email}).select("+password");
        if (!user){
            return next(new errorResponse("Please valid user",401))
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch){
            return next(new errorResponse("Invalid Credentials",401))
        }
        sendToken(user,200,res);

    }catch (err){

        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

exports.forgotPassword = async (req, res,next) =>{
    const {email} = req.body;

    try{
        const user=await User.findOne({email});
        
        if (!user){
            return next(new errorResponse("Email not found"),404);
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl=`http://localhost:3000/passwordreset/${resetToken}`;

        const message =`
        <h1>You have requested a password rest</h1>
        <p>Please go to this link to reset this password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
        `

    try{
        await sendEmail({
            to : user.email,
            subject : "Password Reset Request",
            html : message
        })
        res.status(200).json({
            success : true,
            error : "Email Sent"
        })

    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        return next (new errorResponse("Email could not be sent",500))
    }

    }catch(err){
        next(err);

    }
}

exports.resetPassword = async (req, res,next) =>{
    const {password} =req.body;
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
        const user = await User.findOne({
            resetPasswordToken :resetPasswordToken,
            resetPasswordExpire : {$gt : Date.now() }
        })

        if (!user) {
            return next( new errorResponse("Invalid Reset token"),400)
        }
        user.password = password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        user.save();

        res.status(201).json({
            success: true,
            data : "Password Reset Success"
        })
    }catch(err){
        next(err);
    }
}

const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success :true,
        token : token
    })
}