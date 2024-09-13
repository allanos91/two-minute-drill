'use strict';

const { Contest_prediction } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Contest_prediction.bulkCreate([
      {
        contest_id: 1,
        prediction_id: 1
      },
      {
        contest_id: 1,
        prediction_id: 2
      },
      {
        contest_id: 1,
        prediction_id: 34
      },
      {
        contest_id: 1,
        prediction_id: 66
      }
    ]

    )
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
