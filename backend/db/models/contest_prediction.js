'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest_prediction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contest_prediction.init({
    contest_id: DataTypes.INTEGER,
    prediction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contest_prediction',
  });
  return Contest_prediction;
};