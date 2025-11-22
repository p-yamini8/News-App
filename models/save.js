// models/save.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // adjust path if different

const Save = sequelize.define('Save', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('save', 'unsave'),
    allowNull: false,
    defaultValue: 'save'
  }
}, {
  tableName: 'saves',
  timestamps: true
});

module.exports = Save;
