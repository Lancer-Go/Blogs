const sequelize = require("./connect");
const Sequelize = require('sequelize');
//const Blog = require('./Blog');
const User = sequelize.define('user',{
    userId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:{
        type:Sequelize.STRING(20),
        primaryKey:true,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING(50),
        allowNull: false
    },
},{
    tableName:'user',
    timestamps: false
})
module.exports=User;

//需要事先sync一下表，因为没有表的话无法进行操作
