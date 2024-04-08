const express = require('express');
const {Airportcontroller} = require('../../controllers');
const {Airportmiddleware} = require("../../middlewares")

const router = express.Router();

router.post("/",
  Airportmiddleware.validaterequest,
  Airportcontroller.createAirport
)

router.get("/:id",
  Airportcontroller.getAirport
)
router.get("/",
  Airportcontroller.getAirports
)
router.delete("/:id",
  Airportcontroller.destroyAirport
)
router.patch("/:id",
  Airportcontroller.updateAirport
)
module.exports = router;