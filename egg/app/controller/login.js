'use strict';
const Jwt = require('jsonwebtoken')
const Config = require('../utils/configs')

const Controller = require('egg').Controller;
function tokensign (user) {
    try {
        return Jwt.sign({//签发token
            user_id:user,
            user_name:''//暂未设置
        },Config.token.secret, Config.token.option)//配置里面设置了加密字符串
    } catch (e) {
        throw (e)
    }
}
class LoginController extends Controller {
    async loginFn() {
        const { ctx, service } = this;
        let { user, pwd } = ctx.request.body;
        let result = await service.login.gologin(user, pwd);
        if(result.code===1){
            let token=tokensign(user)
            this.ctx.cookies.set('token', token,
                {
                    maxAge:60*60*1000,//毫秒计算
                    httpOnly:false,
                    overwrite:true,
                    signed:false}) //设置cookies维持登录态
            this.ctx.body = result;
        } else
            ctx.body = result;
    }
}
module.exports = LoginController;
