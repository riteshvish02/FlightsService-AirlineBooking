const { StatusCodes } = require("http-status-codes")
const {AirplaneService } = require("../services")
async function createAirplane(req, res, next){
    try {
        const Airplane = await AirplaneService.CreateAirPlane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
      return res
      .status(StatusCodes.CREATED)
      .json({
        success:true,
        message:"Airplane created successfully",
        data:Airplane,
        error:{}
      })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong while creating airplane",
            data:{},
            error:error.message
        })
        
    }
}

module.exports = {
    createAirplane
}