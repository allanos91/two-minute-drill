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
      },
      {
        contest_id:2,
        prediction_id: 5
      },
      {
        contest_id:2,
        prediction_id: 8
      },
      {
        contest_id:2,
        prediction_id: 64
      },
      {
        contest_id:3,
        prediction_id: 6
      },
      {
        contest_id:3,
        prediction_id: 9
      },
      {
        contest_id:3,
        prediction_id: 65
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
