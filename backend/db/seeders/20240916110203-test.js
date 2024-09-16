'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await User.create({
    //     email: "testgod@gmail.com",
    //     username: "goduser",
    //     firstName: "Alex",
    //     lastName: "Llanos",
    //     hashedPassword: bcrypt.hashSync('password8'),
    //     balance: 900
    // })
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
