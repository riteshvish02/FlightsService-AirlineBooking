const express = require('express');
const {Flightcontroller} = require('../../controllers');
const {Flightmiddleware} = require("../../middlewares")

const router = express.Router();
//only admin role
router.post("/",
  Flightmiddleware.validaterequest,
  Flightmiddleware.timecheck,
  Flightcontroller.createFlight
)

router.get("/:id",
  Flightcontroller.getFlight
)

router.get("/",
  Flightcontroller.getAllflights
)

//only admin role

router.delete("/:id",
  Flightcontroller.destroyFlight
)

//only admin role

router.patch("/:id",
  Flightcontroller.updateFlight
)

//only admin role

router.patch("/:id/seats",
  Flightmiddleware.validateUpdateSeatRequest,
  Flightcontroller.UpdateSeats
)
module.exports = router;