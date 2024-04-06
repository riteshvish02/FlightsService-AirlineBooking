const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
const {serverconfig,Logger} = require("./config")

const apiroutes = require("./routes")

app.use("/api",apiroutes)
app.listen(serverconfig.PORT,async ()=>{
    console.log(`server listening on ${serverconfig.PORT}`);
    Logger.info(`server listening on ${serverconfig.PORT}`,"root",{})
    const {Airport,City} = require("./models")
    // const bhopal = await City.findByPk(2)
    // const airport = await bhopal.createAirport({name:"rajabhoj",code:"bhl"})
        // console.log(airport);    
    // const Airports = await bhopal.getAirports()
    // console.log(Airports);   
    // await City.destroy({
    //     where:{
    //         id:2
    //     }
    // })
})