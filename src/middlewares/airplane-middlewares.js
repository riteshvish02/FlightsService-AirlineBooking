const {StatusCodes} = require("http-status-codes")

const {ErrorResponse} = require("../utils/common")
const AppError = require("../utils/errors/app-error")
function validaterequest(req, res, next) {
    if(!req.body.modelNumber){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["modelNumber is not found"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validaterequest
}