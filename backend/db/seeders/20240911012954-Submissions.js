'use strict';

const {Submission} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Submission.bulkCreate([
      {
        user_id: 2,
        contest_id: 1,
        content: "win lose, 10 7, 20, Under"
      },
      {
        user_id: 3,
        contest_id: 1,
        content: "lose win, 5 8, 20, Under"
      },
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
