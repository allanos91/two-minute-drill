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
        prediction_id: 3
      },
      {
        contest_id: 1,
        prediction_id: 4
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
