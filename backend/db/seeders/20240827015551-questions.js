'use strict';

const { Prediction } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Prediction.bulkCreate([
      {
        type: "win or lose",
        content: "Packers Eagles week 1"
      },
      {
        type: "season record",
        content: "Chiefs"
      },
      {
        type: "team points",
        content: "Ravens week 1"
      },
      {
        type: "over/under",
        content: "Chargers 17.5 week 6"
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
