'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static retrieveoptions(questionID) {
      return this.findAll({
        where: {
          questionID,
        },
        order: [["id", "ASC"]],
      });
    }
    static retriveoption(id) {
      return this.findOne({
        where: {
          id,
        },
      });
    }
    static modifyoption(optionname, id) {
      return this.update(
        {
          optionname: optionname,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    static removeoptions(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }
    static addoption({ optionname, questionID }) {
      return this.create({
        optionname,
        questionID,
      });
    }

    static findoption({ optionname }) {
      return this.findOne({
        optionname,
      });
    }
    static associate(models) {
      // define association here
      options.belongsTo(models.questions, {
        foreignKey: "questionID",
        onDelete: "CASCADE",
      });

      options.hasMany(models.answers, {
        foreignKey: "chossedoption",
      });
    
      
    }
  }
  options.init({
    optionname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'options',
  });
  return options;
};