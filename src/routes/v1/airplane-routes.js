const express = require('express');
const {Airplanecontroller} = require('../../controllers');
const {Airplanemiddleware} = require("../../middlewares")

const router = express.Router();

router.post("/",
  Airplanemiddleware.validaterequest,
  Airplanecontroller.createAirplane
)

router.get("/:id",
  Airplanecontroller.getAirplane
)
router.get("/",
  Airplanecontroller.getAirplanes
)
router.delete("/:id",
  Airplanecontroller.destroyAirplane
)
router.patch("/:id",
  Airplanecontroller.updateAirplane
)
module.exports = router;