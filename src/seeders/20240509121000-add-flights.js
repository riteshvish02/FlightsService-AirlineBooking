"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('flights', [
      {
        flightNumber: 'AA101',
        AirplaneId: 1,
        arrivalAirportId: 'JFK',
        departureAirportId: 'LAX',
        departureTime: new Date('2025-01-10T08:00:00Z'),
        arrivalTime: new Date('2025-01-10T16:00:00Z'),
        price: 500,
        boardingGate: 'A1',
        totalSeats: 245,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'UA202',
        AirplaneId: 2,
        arrivalAirportId: 'LAX',
        departureAirportId: 'ORD',
        departureTime: new Date('2025-02-12T09:30:00Z'),
        arrivalTime: new Date('2025-02-12T12:00:00Z'),
        price: 350,
        boardingGate: 'B3',
        totalSeats: 245,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'DL303',
        AirplaneId: 3,
        arrivalAirportId: 'ORD',
        departureAirportId: 'IAH',
        departureTime: new Date('2025-03-03T06:00:00Z'),
        arrivalTime: new Date('2025-03-03T08:30:00Z'),
        price: 280,
        boardingGate: 'C2',
        totalSeats: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'SW404',
        AirplaneId: 4,
        arrivalAirportId: 'IAH',
        departureAirportId: 'JFK',
        departureTime: new Date('2025-04-01T14:00:00Z'),
        arrivalTime: new Date('2025-04-01T18:00:00Z'),
        price: 320,
        boardingGate: 'D5',
        totalSeats: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('flights', {
      [Op.or]: [
        { flightNumber: 'AA101' },
        { flightNumber: 'UA202' },
        { flightNumber: 'DL303' },
        { flightNumber: 'SW404' }
      ]
    }, {});
  }
};
