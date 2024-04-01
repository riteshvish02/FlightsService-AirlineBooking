const { StatusCodes } = require("http-status-codes")
const airplane = require("../models/airplane")
const {AirlineRepo} = require("../repositories")

const AppError = require("../utils/errors/app-error")

const airplaneRepo = new AirlineRepo()

async function CreateAirPlane(data){
    try {
        const Airplane = await airplaneRepo.Create(data) 
        return Airplane;
    } catch (error) {
        // console.log(error.name);
        if(error.name == "SequelizeValidationError"){
            let Explanation = [];
            error.errors.forEach(function(error) {
                Explanation.push(error.message);
            })
            throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
        }
        // console.log(error);  
        throw new AppError("can't create a new Airplane object", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function getAirPlane(data){
    try {
        const Airplane = await airplaneRepo.get(data) 
        return Airplane;
    } catch (error) {
       if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Airplane you requested is not present", StatusCodes.INTERNAL_SERVER_ERROR)

       }
       throw new AppError("can't fetch data of Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
  
        }

}

module.exports = {
    CreateAirPlane,
    getAirPlane
};