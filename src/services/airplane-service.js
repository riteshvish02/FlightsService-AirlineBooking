const airplane = require("../models/airplane")
const {AirlineRepo} = require("../repositories")

const airplaneRepo = new AirlineRepo()

async function CreateAirPlane(data){
    try {
        const Airplane = await airplaneRepo.Create(data) 
        return Airplane;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    CreateAirPlane
};