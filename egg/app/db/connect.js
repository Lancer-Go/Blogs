const config = {
    database: 'vue_egg', // 数据库
    username: 'root', // 用户名
    password: '', // 密码
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: { ////连接池配置
        max: 5,  //最大连接数
        min: 0,  //最小连接数
        idle: 30000  //断开连接后，连接实例在连接池保持的时间
    }
    //logging: this.logging //输出日志信息  true or false
});
module.exports = sequelize;
