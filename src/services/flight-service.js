const { StatusCodes } = require("http-status-codes")
const {FlightRepo} = require("../repositories")
const AppError = require("../utils/errors/app-error")
const { Op } = require('sequelize');
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

async function getAllFlights(query){
    let endingTriptime = " 23:59:00"
    let customfilter = {};
    let sortFilter = []
    if(query.trips){
        
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        if(departureAirportId == arrivalAirportId){
            throw new AppError("Departure and arrival airports cannot be the same",StatusCodes.BAD_REQUEST)
        }
        customfilter.departureAirportId = departureAirportId;
        customfilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price){
        const [minprice, maxprice] = query.price.split('-');
        customfilter.price = {
            [Op.between]: [minprice, (!maxprice? 20000: maxprice )]
        }
    }
    if(query.travellers){
        customfilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }

    if(query.tripDate){
        console.log(query.tripDate);
        customfilter.departureTime = {
             [Op.between]:[query.tripDate,query.tripDate + endingTriptime]
        }
    }

    if(query.sort){
        const params = query.sort.split(',')
        let sortfilter = params.map(param => {
            return param.split('_')
        })

        sortFilter = sortfilter
       
    }

    try {
        const flights = await flightRepo.getAllFlights(customfilter,sortFilter)
        return flights;
    } catch (error) {
        throw new AppError("can't fetch data of Flights", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports = {
    CreateFlight,
    getFlight,
    destroyFlight,
    updateFlight,
    getAllFlights
};