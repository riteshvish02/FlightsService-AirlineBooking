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
  Flightcontroller.getFlights
)
router.delete("/:id",
  Flightcontroller.destroyFlight
)
router.patch("/:id",
  Flightcontroller.updateFlight
)
module.exports = router;