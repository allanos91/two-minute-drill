'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contest_predictions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contest_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Contests",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      prediction_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Predictions',
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contest_predictions');
  }
};
