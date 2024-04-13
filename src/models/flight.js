'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
        foreignKey: 'AirplaneId',
        as: 'AirplaneDetail',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Airport,{
        foreignKey: 'arrivalAirportId',
        as:'DepartureAirport',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Airport,{
        foreignKey: 'departureAirportId',
        as: 'ArrivalAirport',
        onDelete: 'CASCADE',
      });
      // define association here
    }
  }
  flight.init({
    flightNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    AirplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalTime:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1500,
    },
    boardingGate: DataTypes.STRING,
    totalSeats:{//remaining seats
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'flight',
  });
  return flight;
};