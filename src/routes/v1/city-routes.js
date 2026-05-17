const express = require('express');
const {Citycontroller} = require('../../controllers');
const {Citymiddleware} = require("../../middlewares")

const router = express.Router();
//only admin role

router.post("/",
  Citymiddleware.validaterequest,
  Citycontroller.createCity
)
//only admin role

router.delete("/:id",
  Citycontroller.destroyCity
)
//only admin role

router.patch("/:id",
  Citycontroller.updateCity 
)

module.exports = router;