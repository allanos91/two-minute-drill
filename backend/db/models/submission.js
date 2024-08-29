'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(
        models.Contest,
        {
          foreignKey:'contest_id',
          onDelete: "cascade"
        }
      )
      Submission.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
          onDelete: "cascade"
        }
      )
    }
  }
  Submission.init({
    user_id: DataTypes.INTEGER,
    contest_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};
