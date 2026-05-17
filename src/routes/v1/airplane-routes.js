const express = require('express');
const {Airplanecontroller} = require('../../controllers');
const {Airplanemiddleware} = require("../../middlewares")

const router = express.Router();

//only admin role
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

//only admin role

router.delete("/:id",
  Airplanecontroller.destroyAirplane
)
//only admin role

router.patch("/:id",
  Airplanecontroller.updateAirplane
)
module.exports = router;