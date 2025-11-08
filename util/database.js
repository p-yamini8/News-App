const Sequelize=require('sequelize');
const sequelize=new Sequelize('sakila','root','spypgr@123',{
    host:'localhost',
    dialect:'mysql'
})
module.exports=sequelize;