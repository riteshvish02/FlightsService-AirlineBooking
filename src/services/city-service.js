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

async function destroyCity(data){
    try {
        const response = await cityRepo.destroy(data) 
        return response;
    } catch (error) {
        // console.log(error);
        // console.log(error.name);
        if(error.StatusCode === StatusCodes.NOT_FOUND){
           
            throw new AppError("The Airplane you requested to delete is not present",error.StatusCode)
        }
        // console.log(error);  
        throw new AppError("can't delete  City object", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function updateCity(id,data){
    try {
        const response = await cityRepo.update(id,data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The city you requested to update is not present", error.StatusCode)
    }else if(error.name == "SequelizeValidationError"){
        let Explanation = [];
        error.errors.forEach(function(error) {
            Explanation.push(error.message);
        })
        throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
    }
       throw new AppError("can't update city", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
};