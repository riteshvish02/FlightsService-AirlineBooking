const { StatusCodes } = require("http-status-codes")
const {FlightService } = require("../services")

const {ErrorResponse,SuccessResponse} = require("../utils/common");
const { log } = require("winston");
async function createFlight(req, res, next){
    try {
        const Flight = await FlightService.CreateFlight({
          flightNumber: req.body.flightNumber,
          AirplaneId:req.body.AirplaneId,
          arrivalAirportId:req.body.arrivalAirportId,
          departureAirportId:req.body.departureAirportId,
          departureTime:req.body.departureTime,
          arrivalTime:req.body.arrivalTime,
          price:req.body.price,
          boardingGate:req.body.boardingGate,
          totalSeats:req.body.totalSeats,

        })
     SuccessResponse.data = Flight;
      return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        // console.log(error);
        return res
        .status(error.StatusCode)
        .json(ErrorResponse)
        
    }
}

async function getFlight(req, res, next){
    try {
        const Flight = await FlightService.getFlight(req.params.id)
     SuccessResponse.data = Flight;
      return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
        .status(error.StatusCode)
        .json(ErrorResponse)
        
    }
}


async function destroyFlight(req, res, next){
    try {
        const response = await FlightService.destroyFlight(req.params.id)
       SuccessResponse.data = response;
      return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
        .status(error.StatusCode)
        .json(ErrorResponse)
        
    }
}

async function updateFlight(req, res, next){
    try {
        const response = await FlightService.updateFlight(req.params.id,req.body)
       SuccessResponse.data = response;
      return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
        .status(error.StatusCode)
        .json(ErrorResponse)
        
    }
}

async function getAllflights(req, res, next){
    // console.log(req.query);
    try {
        const Flights = await FlightService.getAllFlights(req.query)
       SuccessResponse.data = Flights;
      return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error
        return res
        .status(200)
        .json(ErrorResponse)
        
    }
}

async function UpdateSeats(req,res){
    try {
        const response = await FlightService.UpdateSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec    
        })
       SuccessResponse.data = response;
      return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error
        return res
        .status(200)
        .json(ErrorResponse)
        
    }
}

module.exports = {
    createFlight,
    getFlight,
    destroyFlight,
    updateFlight,
    getAllflights,
    UpdateSeats
}