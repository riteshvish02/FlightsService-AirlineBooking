const { StatusCodes } = require("http-status-codes")
const {AirportService } = require("../services")

const {ErrorResponse,SuccessResponse} = require("../utils/common")
async function createAirport(req, res, next){
    try {
        const Airport = await AirportService.CreateAirPort({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        })
     SuccessResponse.data = Airport;
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

async function getAirport(req, res, next){
    try {
        const AirPort = await AirportService.getAirPort(req.params.id)
     SuccessResponse.data = AirPort;
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

async function getAirports(req, res, next){
    try {
        const Airports = await AirportService.getAirPorts()
       SuccessResponse.data = Airports;
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

async function destroyAirport(req, res, next){
    try {
        const response = await AirportService.destroyAirport(req.params.id)
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

async function updateAirport(req, res, next){
    try {
        const response = await AirportService.updateAirport(req.params.id,req.body)
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


module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}