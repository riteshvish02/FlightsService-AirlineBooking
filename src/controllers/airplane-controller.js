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
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse)
        
    }
}

module.exports = {
    createAirplane
}