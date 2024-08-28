'use strict';

const { Contest } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Contest.bulkCreate([
      {
        host_id: 1,
        description: "test",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url"
      },
      {
        host_id: 1,
        description: "test2",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url"
      },
      {
        host_id: 2,
        description: "test3",
        closing_date: new Date('December 17, 1995 03:24:00'),
        preview_image: "url"
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
