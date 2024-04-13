'use strict';
/** @type {import('sequelize-cli').Migration} */

const {SEATS_ENUM} = require("../utils/common")
const {PREMIUM,ECONOMY,BUSINESS,FIRST_CLASS} = SEATS_ENUM.Seats

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AirplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'Airplane',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: [PREMIUM,ECONOMY,BUSINESS,FIRST_CLASS],
        defaultValue:ECONOMY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};