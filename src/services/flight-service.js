const { StatusCodes } = require("http-status-codes")
const {FlightRepo} = require("../repositories")

const AppError = require("../utils/errors/app-error")

const flightRepo = new FlightRepo()

async function CreateFlight(data){
    try {
        const Flight = await flightRepo.Create(data) 
        return Flight;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let Explanation = [];
            error.errors.forEach(function(error) {
                Explanation.push(error.message);
            })
            throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
        }
        // console.log(error);  
        throw new AppError("can't create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function getFlight(data){
    try {
        const Flight = await flightRepo.get(data) 
        return Flight;
    } catch (error) {
       if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Flight you requested is not present",error.StatusCode)

       }
       throw new AppError("can't fetch data of Flight", StatusCodes.INTERNAL_SERVER_ERROR)
  
    }
}

async function getFlights(){
            try {
                const Flights = await flightRepo.getAll()
                return Flights;
            } catch (error) {
              
               throw new AppError("can't fetch data of Flights", StatusCodes.INTERNAL_SERVER_ERROR)
          
            }
}

async function destroyFlight(data){
    try {
        const response = await flightRepo.destroy(data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Flight you requested to delete is not present", error.StatusCode)
    }
       throw new AppError("can't delete Flight ", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}

async function updateFlight(id,data){
    try {
        const response = await flightRepo.update(id,data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The Flight you requested to update is not present", error.StatusCode)
    }else if(error.name == "SequelizeValidationError"){
        let Explanation = [];
        error.errors.forEach(function(error) {
            Explanation.push(error.message);
        })
        throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
    }
       throw new AppError("can't update Flight ", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}
module.exports = {
    CreateFlight,
    getFlight,
    getFlights,
    destroyFlight,
    updateFlight
};