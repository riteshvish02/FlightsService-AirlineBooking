const {StatusCodes} = require("http-status-codes")

const {ErrorResponse} = require("../utils/common")
const AppError = require("../utils/errors/app-error")
const {compareTime} = require('../utils/helpers/date-time-helpers')
function validaterequest(req, res, next) {
    if(!req.body.flightNumber){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["Flight Name is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.AirplaneId){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["Flight code is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    
    if(!req.body.departureAirportId){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.price){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["cityId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    
    next();
}

function timecheck(req, res, next) {
   if(!compareTime(req.body.arrivalTime,req.body.departureTime)){
    ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["Arrival time must greater than departure time"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
    next();

}
function validateUpdateSeatRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message = "something went wrong while creating Airplane"
        ErrorResponse.error =  new AppError(["flightId is not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res 
         .status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse)
    }
   next()
}

module.exports = {
    validaterequest,
    timecheck,
    validateUpdateSeatRequest
}