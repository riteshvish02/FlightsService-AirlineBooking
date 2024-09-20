const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
const {serverconfig,Logger} = require("./config")
const cors = require('cors');
// const {compareTime} = require('./utils/helpers/date-time-helpers')
// console.log(compareTime)

const apiroutes = require("./routes")

app.use(cors({
    origin: 'http://localhost:5173', // Your React app's address
}));


app.use("/api",apiroutes)
app.listen(serverconfig.PORT,async ()=>{
    console.log(`server listening on ${serverconfig.PORT}`);
    Logger.info(`server listening on ${serverconfig.PORT}`,"root",{})
    // const {flight} = require("./models")
    // const response = await flight.findAll({
    //     where:{
    //         totalSeats:140
    //     }
    // })   
    // console.log(response);
    
})