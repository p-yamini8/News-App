const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Save = sequelize.define('Save', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('save', 'unsave'), allowNull: false }, // like or dislike
}, {
  tableName: 'saves',
});

module.exports = Save;
