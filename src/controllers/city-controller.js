const { StatusCodes } = require("http-status-codes")
const {CityService } = require("../services")

const {ErrorResponse,SuccessResponse} = require("../utils/common")
async function createCity(req, res, next){
    try {
        const city = await CityService.createCity({
           name:req.body.name
        })
     SuccessResponse.data = city;
      return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        console.log(error);
        return res
        .status(error.StatusCode)
        .json(ErrorResponse)
        
    }
}


module.exports = {
    createCity,
   
}