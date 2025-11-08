const {DataTypes}=require('sequelize');
const sequelize=require('../util/database')
const user=sequelize.define('usr',{
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
module.exports=user;