const CrudRepository = require("./crud-repo")
const {flight,Airplane,Airport,City} = require("../models")
const {Sequelize} = require('sequelize')
class FlightRepo extends CrudRepository {
   constructor(){
       super(flight)
  }
 async getAllFlights(filter,sort){
      const response = await flight.findAll({
        where: filter,
        order:sort,
        include:[
          {
            model: Airplane,
            required: true,
            as:"AirplaneDetail"
          },
          {
            model:Airport,
            required: true,
            as:"DepartureAirport",
            include:{
             model:City,
             required:true,
            },
            on:{
              col1:Sequelize.where(Sequelize.col("flight.departureAirportId"), "=" , Sequelize.col("DepartureAirport.code"))
            }
          },
          {
            model:Airport,
            required: true,
            as:"ArrivalAirport",
            include:{
              model:City,
              required:true,
             },
            on:{
              col1:Sequelize.where(Sequelize.col("flight.arrivalAirportId"), "=" , Sequelize.col("ArrivalAirport.code"))
            }
          }
        ]
      })
      return response;

  }
}

module.exports = FlightRepo;