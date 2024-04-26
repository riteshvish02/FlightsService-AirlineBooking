const express = require('express');
const {Flightcontroller} = require('../../controllers');
const {Flightmiddleware} = require("../../middlewares")

const router = express.Router();

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
router.delete("/:id",
  Flightcontroller.destroyFlight
)
router.patch("/:id",
  Flightcontroller.updateFlight
)

router.patch("/:id/seats",
  Flightmiddleware.validateUpdateSeatRequest,
  Flightcontroller.UpdateSeats
)
module.exports = router;