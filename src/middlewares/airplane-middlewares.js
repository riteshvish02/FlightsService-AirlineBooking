const {StatusCodes} = require("http-status-codes")

const {ErrorResponse} = require("../utils/common")
function validaterequest(req, res, next) {
    if(!req.body.modelNumber){
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validaterequest
}