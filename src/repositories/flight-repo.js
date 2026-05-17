const CrudRepository = require("./crud-repo")
const {flight,Airplane,Airport,City} = require("../models")
const {Sequelize} = require('sequelize')
const db = require('../models')
const {AddrowLockOnFlights} = require("./query")
class FlightRepo extends CrudRepository {
   constructor(){
       super(flight)
  }
 async getAllFlights(filter,sort){
  //automatically includes and if you want or then use [Op.or]:[{departureAirportId:""},arrivalAirportId]
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

//             SELECT * 
//             FROM Flights 
//             JOIN Airplanes ON Flights.airplaneId = Airplanes.id
//             JOIN Airports AS DepartureAirport ON Flights.departureAirportId = DepartureAirport.code
//             JOIN Cities ON DepartureAirport.cityId = Cities.id
//             JOIN Airports AS ArrivalAirport ON Flights.arrivalAirportId = ArrivalAirport.code
//             JOIN Cities ON ArrivalAirport.cityId = Cities.id;

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
 
  async UpdateRemainingSeats(flightId,seats,dec = true){
    await db.sequelize.query(AddrowLockOnFlights(flightId))
    const Flight = await flight.findByPk(flightId);
    if(+dec){
      const  response = await Flight.decrement('totalSeats', { by: seats });
      return response;
    }else{
      const  response = await Flight.increment('totalSeats', { by: seats });
      return response;
    }
  }
  
}


// const t = await sequelize.transaction({
//   isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
// });

// try {
//   const flight = await Flight.findByPk(id, {
//     transaction: t,
//     lock: t.LOCK.UPDATE
//   });

//   if (flight.totalSeats < seats) throw error;

//   await flight.decrement("totalSeats", { by: seats, transaction: t });

//   await t.commit();
// } catch (e) {
//   await t.rollback();
// }



// isolationLevel: REPEATABLE_READ

// Iska matlab:

// Is transaction ke andar jo data ek baar padha,
// wo baar-baar padhne pe change nahi dikhega



// Yaha 2 cheezein ho rahi hain 👇
// (A) transaction: t

// Is query ko transaction ka part bana diya

// Ab ye read/write isolated environment me hoga



//Matlab:
// Is flight row pe WRITE LOCK laga do
// jab tak ye transaction complete na ho
module.exports = FlightRepo;