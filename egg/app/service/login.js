'use strict';
const Service = require('egg').Service;
const User = require('../db/User');

class LoginService extends Service {
    async gologin(user,pwd) {
        let data = await User.findAll({
            where:{
                user:user,
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
module.exports = LoginService;
