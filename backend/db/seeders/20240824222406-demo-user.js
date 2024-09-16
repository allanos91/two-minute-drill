'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: "Alex",
        lastName: "Llanos",
        hashedPassword: bcrypt.hashSync('password'),
        balance: 100000
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: "Nathan",
        lastName: "Llanos",
        hashedPassword: bcrypt.hashSync('password2'),
        balance: 10
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: "Rene",
        lastName: "Llanos",
        hashedPassword: bcrypt.hashSync('password3'),
        balance: 5
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
