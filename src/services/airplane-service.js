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
        throw new AppError("The Airplane you requested is not present",error.StatusCode)

       }
       throw new AppError("can't fetch data of Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
  
        }
}

async function getAirPlanes(){
            try {
                const Airplanes = await airplaneRepo.getAll()
                return Airplanes;
            } catch (error) {
              
               throw new AppError("can't fetch data of Airplanes", StatusCodes.INTERNAL_SERVER_ERROR)
          
            }
}

async function destroyAirplane(data){
    try {
        const response = await airplaneRepo.destroy(data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Airplane you requested to delete is not present", error.StatusCode)
    }
       throw new AppError("can't delete Aiplane Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}

async function updateAirplane(id,data){
    try {
        const response = await airplaneRepo.update(id,data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Airplane you requested to update is not present", error.StatusCode)
    }else if(error.name == "SequelizeValidationError"){
        let Explanation = [];
        error.errors.forEach(function(error) {
            Explanation.push(error.message);
        })
        throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
    }
       throw new AppError("can't update Aiplane Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}
module.exports = {
    CreateAirPlane,
    getAirPlane,
    getAirPlanes,
    destroyAirplane,
    updateAirplane
};