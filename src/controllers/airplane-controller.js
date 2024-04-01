const { StatusCodes } = require("http-status-codes")
const {AirplaneService } = require("../services")

const {ErrorResponse,SuccessResponse} = require("../utils/common")
async function createAirplane(req, res, next){
    try {
        const Airplane = await AirplaneService.CreateAirPlane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
     SuccessResponse.data = Airplane;
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

async function getAirplane(req, res, next){
    try {
        const Airplane = await AirplaneService.getAirPlane(req.params.id)
     SuccessResponse.data = Airplane;
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
    createAirplane,
    getAirplane
}