const mongoose=require("mongoose");


const connectDB = async () =>{
    await mongoose.connect(process.env.KEY);
    try{
        console.log("MongoDB connected");
    }catch(err){
        console.log(err);
    }
    
}

module.exports =connectDB;