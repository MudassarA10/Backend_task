const { sequelize } = require("./database");
const { DataTypes } = require("sequelize");
const Task = sequelize.define("task", {
  content: {
    type: DataTypes.STRING,
    validate: {
      max: 150,
    },
  },
  Description: {
    type: DataTypes.TEXT,
  },
  Address: {
    type: DataTypes.STRING,
  },
});
// sequelize.sync();
module.exports = { Task, sequelize, DataTypes };
