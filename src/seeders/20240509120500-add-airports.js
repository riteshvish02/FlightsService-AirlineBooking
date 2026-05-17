"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airports', [
      {
        name: "John F Kennedy International Airport",
        code: "JFK",
        address: "Queens, NY",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Los Angeles International Airport",
        code: "LAX",
        address: "Los Angeles, CA",
        cityId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "O'Hare International Airport",
        code: "ORD",
        address: "Chicago, IL",
        cityId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "George Bush Intercontinental Airport",
        code: "IAH",
        address: "Houston, TX",
        cityId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', {
      [Op.or]: [
        { code: 'JFK' },
        { code: 'LAX' },
        { code: 'ORD' },
        { code: 'IAH' }
      ]
    }, {});
  }
};
