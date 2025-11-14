const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Like = sequelize.define('Like', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('like', 'dislike'), allowNull: false }, // like or dislike
}, {
  tableName: 'likes',
});

module.exports = Like;
