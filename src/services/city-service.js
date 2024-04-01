const { StatusCodes } = require("http-status-codes")
const airplane = require("../models/airplane")
const {CityRepo} = require("../repositories")

const AppError = require("../utils/errors/app-error")

const CityRepo = new CityRepo()

async function CreateCity(data){
    try {
        const City = await CityRepo.Create(data) 
        return City;
    } catch (error) {
        // console.log(error.name);
        if(error.name == "SequelizeValidationError"){
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

async function getCity(data){
    try {
        const City = await CityRepo.get(data) 
        return City;
    } catch (error) {
       if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The City you requested is not present",error.StatusCode)

       }
       throw new AppError("can't fetch data of City", StatusCodes.INTERNAL_SERVER_ERROR)
  
        }
}

async function getCitys(){
            try {
                const Citys = await CityRepo.getAll()
                return Citys;
            } catch (error) {
              
               throw new AppError("can't fetch data of Citys", StatusCodes.INTERNAL_SERVER_ERROR)
          
            }
}

async function destroyCity(data){
    try {
        const response = await CityRepo.destroy(data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The City you requested to delete is not present", error.StatusCode)
    }
       throw new AppError("can't delete Aiplane City", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}

async function updateCity(id,data){
    try {
        const response = await CityRepo.update(id,data) 
        return response;
    } catch (error) {
    if(error.StatusCode == StatusCodes.NOT_FOUND){
        throw new AppError("The City you requested to update is not present", error.StatusCode)
    }else if(error.name == "SequelizeValidationError"){
        let Explanation = [];
        error.errors.forEach(function(error) {
            Explanation.push(error.message);
        })
        throw new AppError(Explanation,StatusCodes.BAD_REQUEST)
    }
       throw new AppError("can't update Aiplane City", StatusCodes.INTERNAL_SERVER_ERROR)
     }
}
module.exports = {
    CreateCity,
    getCity,
    getCitys,
    destroyCity,
    updateCity
};