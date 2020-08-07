const sequelize = require("./connect");
const Sequelize = require('sequelize');
const User = require("./User");
const Blog = sequelize.define('blog',{
    artId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:Sequelize.STRING(20),
        allowNull: false
    },
    title:{
        type:Sequelize.STRING(20),
        allowNull: false
    },
    article:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    isPublish:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
},{
    tableName:'blog',
    timestamps: false
})
Blog.belongsTo(User,{foreignKey:'userId',targetKey:'user'});
module.exports=Blog;
