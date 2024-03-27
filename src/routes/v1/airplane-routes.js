const express = require('express');
const {Airplanecontroller} = require('../../controllers');


const router = express.Router();

router.post("/",Airplanecontroller.createAirplane)

module.exports = router;