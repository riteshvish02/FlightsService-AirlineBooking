const express = require('express');
const {Airportcontroller} = require('../../controllers');
const {Airportmiddleware} = require("../../middlewares")

const router = express.Router();
//only admin role

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
//only admin role

router.delete("/:id",
  Airportcontroller.destroyAirport
)
//only admin role

router.patch("/:id",
  Airportcontroller.updateAirport
)
module.exports = router;