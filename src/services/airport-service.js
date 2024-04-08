const { StatusCodes } = require("http-status-codes")
const {AirportRepo} = require("../repositories")

const AppError = require("../utils/errors/app-error")

const airportRepo = new AirportRepo()

async function CreateAirPort(data){
    try {
        const Airport = await airportRepo.Create(data) 
        return Airport;
    } catch (error) {
        // console.log(error.name);
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError    "){
            let Explanation = [];
            error.errors.forEach(function(error) {
                Explanation.push(error.message);
            })
            throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
        }
        // console.log(error);  
        throw new AppError("can't create a new Airport object", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function getAirPort(data){
    try {
        const Airport = await airportRepo.get(data) 
        return Airport;
    } catch (error) {
       if(error.StatusCode == StatusCodes.NOT_FOUND || error.name == "SequelizeUniqueConstraintError"){
        throw new AppError("The Airport you requested is not present",error.StatusCode)

       }
       throw new AppError("can't fetch data of Airport", StatusCodes.INTERNAL_SERVER_ERROR)
  
        }
}

async function getAirPorts(){
            try {
                const Airports = await airportRepo.getAll()
                return Airports;
            } catch (error) {
              
               throw new AppError("can't fetch data of Airports", StatusCodes.INTERNAL_SERVER_ERROR)
          
            }
}

async function destroyAirport(data){
    try {
        const response = await airportRepo.destroy(data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Airport you requested to delete is not present", error.StatusCode)
    }
       throw new AppError("can't delete Airport ", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}

async function updateAirport(id,data){
    try {
        const response = await airportRepo.update(id,data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Airport you requested to update is not present", error.StatusCode)
    }else if(error.name == "SequelizeValidationError"){
        let Explanation = [];
        error.errors.forEach(function(error) {
            Explanation.push(error.message);
        })
        throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
    }
       throw new AppError("can't update Aiplane ", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}
module.exports = {
    CreateAirPort,
    getAirPort,
    getAirPorts,
    destroyAirport,
    updateAirport
};