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
      },
      {
        type: "Win or lose",
        content: "Bears Titans week 1"
      },
      {
        type: "Win or lose",
        content: "Bears Texans week 2"
      },
      {
        type: "Win or lose",
        content: "Bears Colts week 3"
      },
      {
        type: "Win or lose",
        content: "Bears Rams week 4"
      },
      {
        type: "Win or lose",
        content: "Bears Panthers week 5"
      },
      {
        type: "Win or lose",
        content: "Bears Jaguars week 6 "
      },
      {
        type: "Win or lose",
        content: "Bears Commanders week 8"
      },
      {
        type: "Win or lose",
        content: "Bears Cardinals week 9"
      },
      {
        type: "Win or lose",
        content: "Bears Patriots week 10"
      },
      {
        type: "Win or lose",
        content: "Bears Packers week 11"
      },
      {
        type: "Win or lose",
        content: "Bears Vikings week 12"
      },
      {
        type: "Win or lose",
        content: "Bears Lions week 13"
      },
      {
        type: "Win or lose",
        content: "Bears 49ers week 14"
      },
      {
        type: "Win or lose",
        content: "Bears Vikings week 15"
      },
      {
        type: "Win or lose",
        content: "Bears Lions week 16"
      },
      {
        type: "Win or lose",
        content: "Bears Seahawks week 17"
      },
      {
        type: "Win or lose",
        content: "Bears Packers week 18"
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
