const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sakila', 'root', 'spypgr@123', {
  host: 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: false
});

module.exports = sequelize;
