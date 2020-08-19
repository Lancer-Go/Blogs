'use strict';
const Service = require('egg').Service;

class RegistryService extends Service {
    async goregistry(user, pwd) {
        const User = require('../db/User');
        let data = await User.findOne({
            where:{
                user:user
            },
            raw:true   //直接返回数据结果
        });
        if (data) {
            return {
                code: -1,
                message: '注册失败,用户已存在',
            }
        } else {
            let dat = await User.create({
                user: user,
                password: pwd
            });
            if(dat){
                return {
                    code: 1,
                    message: '注册成功',
                    //dat   //一般不返回，容易信息泄露
                }
            } else{
                return {
                    code: 0,
                    message: '注册失败，断开连接',
                    //dat   //一般不返回，容易信息泄露
                }
            }
        }

    }
}

module.exports = RegistryService;
