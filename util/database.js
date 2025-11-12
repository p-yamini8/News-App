const Sequelize=require('sequelize');
const sequelize=new Sequelize('sakila','root','spypgr@123',{
    host:'localhost',
    dialect:'mysql',
     logging: console.log, // ✅ log SQL queries
})
module.exports=sequelize;