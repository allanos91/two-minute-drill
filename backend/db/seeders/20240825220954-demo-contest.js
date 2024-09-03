'use strict';

const { Contest } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Contest.bulkCreate([
      {
        host_id: 1,
        description: "Join our online football contest! Predict match scores, win exciting prizes, and show off your football knowledge. Enter now for a chance to be crowned the ultimate football expert!",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url",
        price: 10
      },
      {
        host_id: 1,
        description: "Test your football skills in our thrilling online contest. Correctly predict game outcomes to earn points and claim awesome prizes. Compete with fans worldwide and prove you're a football mastermind!",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url",
        price: 12
      },
      {
        host_id: 2,
        description: "Score big in our online football contest! Predict match results, climb the leaderboard, and win fantastic rewards. Enter today and showcase your football prowess for a chance to shine!",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url",
        price: 5
      }
    ])
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
