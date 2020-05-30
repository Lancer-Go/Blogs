'use strict';
const Service = require('egg').Service;
const User = require('./config');
class LoginService extends Service {
    async gologin(user,pwd) {
        let data = await User.findAll({
            where:{
                name:user,
                password:pwd
            }
        });
        if(data.length>0){
            return{
                code:1,
                message:'登陆成功',
            }
        }else{
            return{
                code:-1,
                message:'登陆失败'
            }
        }
    }
}
//User.sync({force:true})第一次需要初始表
module.exports = LoginService;
