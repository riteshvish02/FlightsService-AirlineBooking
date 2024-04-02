const { StatusCodes } = require("http-status-codes")
const {CityRepo} = require("../repositories")

const AppError = require("../utils/errors/app-error")

const cityRepo = new CityRepo()

async function createCity(data){
    try {
        const City = await cityRepo.Create(data) 
        return City;
    } catch (error) {
        // console.log(error);
        // console.log(error.name);
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let Explanation = [];
            error.errors.forEach(function(error) {
                Explanation.push(error.message);
            })
            throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
        }
        // console.log(error);  
        throw new AppError("can't create a new City object", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}


module.exports = {
    createCity,
};