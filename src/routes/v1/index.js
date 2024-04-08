const express = require('express');
const router = express.Router();
const {infocontroller} = require("../../controllers")
const airplaneroutes = require("./airplane-routes")
const cityroutes = require("./city-routes")
const airportroutes = require("./airport-routes")
const flightsroutes = require("./flights-routes")

router.use('/airplanes',airplaneroutes);
router.use('/cities',cityroutes);
router.use('/airports',airportroutes);
router.use('/flights',flightsroutes);
router.get('/info',infocontroller.info);

module.exports = router;