
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 👇 This will be created automatically by association, 
  // but if you want it explicitly:
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // or false if every post must belong to a user
    references: {
      model: 'usr', // name of the user table
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

module.exports = Post;
