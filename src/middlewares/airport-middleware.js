const {StatusCodes} = require("http-status-codes")

const {ErrorResponse} = require("../utils/common")
const AppError = require("../utils/errors/app-error")
function validaterequest(req, res, next) {
    if(!req.body.name){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["Airport Name is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["Airport code is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.cityId){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    
    next();
}

module.exports = {
    validaterequest
}