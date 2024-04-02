const express = require('express');
const router = express.Router();
const {infocontroller} = require("../../controllers")
const airplaneroutes = require("./airplane-routes")
const cityroutes = require("./city-routes")

router.use('/airplanes',airplaneroutes);
router.use('/cities',cityroutes);
router.get('/info',infocontroller.info);

module.exports = router;