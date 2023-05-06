const errorResponse =require("../utils/errorResponse")

const errorHandler = (err, req, res, next) =>{
    let error = {...err};

    error.message=err.message;
    console.log(err);
    if (err.statusCode===400){
        const message = `Invalid Credentials`;
        error= new errorResponse (message,400);
    }
    if (err.statusCode===11000){
        const message = `Duplicate Field Value entered`;
        error= new errorResponse (message,400);
    }
    if (err.name=== "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error= new errorResponse (message,400);
    }
    res.status (error.statusCode || 500).json({
        success : false,
        error : error.message || "Server Error"
    })
}
module.exports= errorHandler;