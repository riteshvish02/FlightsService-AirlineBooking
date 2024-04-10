const CrudRepository = require("./crud-repo")
const {flight} = require("../models")

class FlightRepo extends CrudRepository {
   constructor(){
       super(flight)
  }
 async getAllFlights(filter,sort){
      const response = await flight.findAll({
        where: filter,
        order:sort,
       
      })
      return response;

  }
}

module.exports = FlightRepo;