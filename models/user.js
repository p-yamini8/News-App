const {DataTypes}=require('sequelize');

const sequelize=require('../util/database')
const User=sequelize.define('User',{
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
    },
    profileImage: {
  type: DataTypes.STRING,
  allowNull: true
}

},{
  freezeTableName: true,
  tableName: 'User',  // 👈 match the lowercase version already in DB
})

module.exports=User;