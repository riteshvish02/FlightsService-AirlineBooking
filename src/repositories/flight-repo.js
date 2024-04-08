const CrudRepository = require("./crud-repo")
const {flight} = require("../models")

class FlightRepo extends CrudRepository {
   constructor(){
       super(flight)
  }
}

module.exports = FlightRepo;