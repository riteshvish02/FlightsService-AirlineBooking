function AddrowLockOnFlights(flightId){
   return `SELECT * FROM FLIGHTS WHERE ID = ${flightId} FOR UPDATE`
}

module.exports = {
    AddrowLockOnFlights
}