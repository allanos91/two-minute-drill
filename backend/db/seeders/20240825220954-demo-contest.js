'use strict';

const { Contest } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Contest.bulkCreate([
      {
        host_id: 4,
        description: "East vs West Coast",
        closing_date: new Date('December 19, 2024 03:24:00'),
        preview_image: "url",
        price: 10
      },
      {
        host_id: 4,
        description: "NFL Weekly Challenge",
        closing_date: new Date('December 18, 2024 03:24:00'),
        preview_image: "url",
        price: 12
      },
      {
        host_id: 4,
        description: "NFL Regular Season Challenge",
        closing_date: new Date('December 15, 2024 03:24:00'),
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
