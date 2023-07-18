const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Beer = sequelize.define('beer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bartender_preparation_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pour_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Beer;