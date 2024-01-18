const { Sequelize }= require('sequelize');
const sequelize =new Sequelize('attendance','root','root123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;