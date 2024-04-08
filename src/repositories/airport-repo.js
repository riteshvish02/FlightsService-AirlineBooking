const CrudRepository = require("./crud-repo")
const {Airport} = require("../models")

class AirportRepo extends CrudRepository {
   constructor(){
       super(Airport)
  }
}

module.exports = AirportRepo;