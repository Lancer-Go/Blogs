'use strict';
const Service = require('egg').Service;
const User = require('./config');

class RegistryService extends Service {
    async goregistry(user, pwd) {
        let data = await User.findAll({
            where:{
                name:user
            }
        });
        if (data.length > 0) {
            return {
                code: -1,
                message: '注册失败,用户已存在',
            }
        } else {

            let dat = await User.create({
                name: user,
                password: pwd
            });
            return {
                code: 1,
                message: '注册成功',
                dat
            }
        }

    }
}

module.exports = RegistryService;
