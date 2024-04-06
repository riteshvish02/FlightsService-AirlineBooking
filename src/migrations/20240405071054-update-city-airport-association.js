'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
     await queryInterface.addConstraint('Airports',{
      type:'foreign key',
      fields:['cityId'],
      name:'fk_airport_cityId',
      references:{
         table:'Cities',
         field :'id'
      },
      onDelete: 'CASCADE',
     
     });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     *
     */
    await queryInterface.removeConstraint('Airports','fk_airport_cityId');
  }
};
