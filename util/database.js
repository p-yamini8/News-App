const { Sequelize } = require('sequelize');

// AUTO SWITCH BETWEEN LOCAL & LIVE DB
const isProduction = process.env.NODE_ENV === "production";

// Local Database (runs on your laptop)
const localConfig = {
  database: "sakila",
  username: "root",
  password: "spypgr@123",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
};

// Live Database (TiDB Cloud)
const liveConfig = {
  database: process.env.LIVE_DB_NAME,
  username: process.env.LIVE_DB_USER,
  password: process.env.LIVE_DB_PASSWORD,
  host: process.env.LIVE_DB_HOST,
  port: process.env.LIVE_DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false, 
      minVersion: "TLSv1.2",
   
     }
  }
};

const config = isProduction ? liveConfig : localConfig;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
    dialectOptions: config.dialectOptions || {}
  }
);

module.exports = sequelize;
