const CrudRepository = require("./crud-repo")
const {Airplane} = require("../models")

class AirlineRepo extends CrudRepository {
   constructor(){
       super(Airplane)
  }
}

module.exports = AirlineRepo;