const express = require('express');

const app = express();
const {serverconfig} = require("./config")
const apiroutes = require("./routes")
app.use("/api",apiroutes)
app.listen(serverconfig.PORT,()=>{
    console.log(`server listening on ${serverconfig.PORT}`);
})