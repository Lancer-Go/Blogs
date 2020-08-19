'use strict';
const Service = require('egg').Service;
class LoginService extends Service {
    async gologin(user,pwd) {
        const User = require('../db/User');
        let data = await User.findAll({
                where:{
                    user:user,
                    password:pwd
                },
                raw:true   //直接返回数据结果
        });
        if(data){
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
