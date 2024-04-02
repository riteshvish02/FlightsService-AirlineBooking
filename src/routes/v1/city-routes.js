const express = require('express');
const {Citycontroller} = require('../../controllers');
const {Citymiddleware} = require("../../middlewares")

const router = express.Router();

router.post("/",
  Citymiddleware.validaterequest,
  Citycontroller.createCity
)

router.delete("/:id",
  Citycontroller.destroyCity
)



module.exports = router;