const {DataTypes}=require('sequelize');
const Post=require('./post')
const sequelize=require('../util/database')
const User=sequelize.define('usr',{
    id:{
 type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
         type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
   password:{
         type:DataTypes.STRING,
        allowNull:false,
    }

},{
  freezeTableName: true, // ✅ Stops pluralizing the table name
    },)
module.exports=User;
// models/associations.js or wherever you define them
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
