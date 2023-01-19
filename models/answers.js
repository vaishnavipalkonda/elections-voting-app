'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    static addResponse({ voterid, ElectionID, questionID, chosedoption }) {
      return this.create({
        ElectionID,
        questionID,
        voterid,
        chosedoption,
      });
    }

    static retriveanswers(ElectionID) {
      return this.findAll({
        where: {
          ElectionID,
        },
      });
    }

    static retrivecountoptions(chosedoption, ElectionID, questionID) {
      return this.count({
        where: {
          chosedoption,
          ElectionID,
          questionID,
        },
      });
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      answers.belongsTo(models.Election, {
        foreignKey: "ElectionID",
      });

      answers.belongsTo(models.questions, {
        foreignKey: "questionID",
      });

      answers.belongsTo(models.Voters, {
        foreignKey: "voterid",
      });
      answers.belongsTo(models.options, {
        foreignKey: "chosedoption",
      });
      // define association here
    }
  }
  answers.init({
    voterid: DataTypes.INTEGER,
    electionid: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    chosedoption: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};