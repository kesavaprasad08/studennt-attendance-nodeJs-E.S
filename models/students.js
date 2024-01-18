const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');
const Students =sequelize.define('Students',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    totalNumberOfDays:{
        type:Sequelize.INTEGER,
        default:0,
    },
    numberOfDaysPresent:{
        type:Sequelize.INTEGER,
        default:0,
    }
});

module.exports=Students;