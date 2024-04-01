const CrudRepository = require("./crud-repo")
const {City} = require("../models")

class CityRepo extends CrudRepository {
   constructor(){
       super(City)
  }
}

module.exports = CityRepo;