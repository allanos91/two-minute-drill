'use strict';

const {Submission} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Submission.bulkCreate([
      // {
      //   user_id: 1,
      //   contest_id: 1,
      //   content: "answer1, answer2, answer3, answer 4, answer 5, answer 6, answer 7"
      // },
      // {
      //   user_id: 1,
      //   contest_id: 3,
      //   content: "answer1, answer2, answer3, answer 4, answer 5, answer 6, answer 7"
      // },
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
