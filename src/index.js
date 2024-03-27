const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
const {serverconfig,Logger} = require("./config")
// const  {AirlineRepo} = require("./repositories")
// var obj = new AirlineRepo()

const apiroutes = require("./routes")

app.use("/api",apiroutes)
app.listen(serverconfig.PORT,()=>{
    console.log(`server listening on ${serverconfig.PORT}`);
    Logger.info(`server listening on ${serverconfig.PORT}`,"root",{})
})