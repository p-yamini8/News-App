const {DataTypes, Model}=require('sequelize');

const sequelize=require('../util/database')
const Post = sequelize.define('Post', {
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'posts', // ✅ lowercase and exact table name in MySQL
});
module.exports=Post;