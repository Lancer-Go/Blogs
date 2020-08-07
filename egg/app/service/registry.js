'use strict';
const Service = require('egg').Service;
const User = require('../db/User');

class RegistryService extends Service {
    async goregistry(user, pwd) {
        let data = await User.findAll({
            where:{
                user:user
            }
        });
        if (data.length > 0) {
            return {
                code: -1,
                message: '注册失败,用户已存在',
            }
        } else {
            let dat = await User.create({
                user: user,
                password: pwd
            });
            return {
                code: 1,
                message: '注册成功',
                //dat   //一般不返回，容易信息泄露
            }
        }

    }
}

module.exports = RegistryService;
