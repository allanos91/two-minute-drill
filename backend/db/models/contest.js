'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contest.belongsTo(
        models.User,
        {
          foreignKey: 'host_id',
        }
      )
      Contest.belongsToMany(
        models.Prediction,
        {
          through: models.Contest_prediction,
          foreignKey: "contest_id",
          otherKey: "prediction_id",
          onDelete: "cascade"
        }
      )
      Contest.hasMany(
        models.Submission,
        {
          foreignKey: 'contest_id',
          onDelete: "cascade"
        }
      )
    }
  }
  Contest.init({
    host_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    closing_date: DataTypes.DATE,
    preview_image: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contest',
  });
  return Contest;
};
