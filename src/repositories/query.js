function    AddrowLockOnFlights(flightId){
   return `SELECT * FROM FLIGHTS WHERE FLIGHTS.ID = ${flightId} FOR UPDATE`
}
// Sirf us row pe lock
// Dusra transaction wait karega
// for table locks do
// LOCK TABLE Flights WRITE;

module.exports = {
    AddrowLockOnFlights
}