function    AddrowLockOnFlights(flightId){
   return `SELECT * FROM FLIGHTS WHERE FLIGHTS.ID = ${flightId} FOR UPDATE`
}

module.exports = {
    AddrowLockOnFlights
}