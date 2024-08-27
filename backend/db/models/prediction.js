'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prediction.belongsToMany(
        models.Contest,
        {
          through: models.Contest_prediction,
          foreignKey: "prediction_id",
          otherKey: "contest_id",
          onDelete: "cascade"
        }
      )
    }
  }
  Prediction.init({
    type: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prediction',
  });
  return Prediction;
};
