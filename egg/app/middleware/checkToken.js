//jwt中间件
const config = require('../utils/configs')
module.exports = () => {
    const jwt = require('jsonwebtoken');
    return async function (ctx, next) {
        if (ctx.request.header['authorization']) {
            let token = ctx.request.header['authorization'];
            console.log("这是一个token")
            console.log(token)
            let decoded;
            //解码token
            try {
                decoded = jwt.verify(token, config.token.secret);//尝试解码，如果解码不成功或者令牌过期，就抛出错误
            } catch (error) {
                if (error.name === 'TokenExpiredError') {//token过期
                    console.log('时间到期')
                    //重新发放令牌
                    let { user } = ctx.request.body;
                    console.log("这是用户名"+user)
                    token = jwt.sign({//重新发token
                        user_id: 1,
                        user_name: user
                    }, config.token.secret, config.token.option);
                    ctx.cookies.set('token', token, {
                        maxAge: 60 * 60 * 1000,
                        httpOnly: false,
                        overwrite: true,
                        signed: false
                    });
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        message: 'token失效'
                    }
                    return;
                }
            }
            //重置cookie时间
            ctx.cookies.set('token', token, {
                maxAge: 60* 60 * 1000,
                httpOnly: false,
                overwrite: true,
                signed: false
            });
            await next();
        } else {
            ctx.status = 401;
            ctx.body = {
                message: '没有token'
            }
        }
    }
};
