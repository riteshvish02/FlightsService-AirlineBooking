const express = require('express');
const router = express.Router();
const {infocontroller} = require("../../controllers")
const airplaneroutes = require("./airplane-routes")

router.use('/airplanes',airplaneroutes);
router.get('/info',infocontroller.info);

module.exports = router;