'use strict';
const Controller = require('egg').Controller;
class RegistryController extends Controller {
    async registryFn() {
        const { ctx, service } = this;
        let { user, pwd} = ctx.request.body;
        let result = await service.registry.goregistry(user, pwd);
        //核对捕获异常
        ctx.runInBackground(async ()=>{
                //这里捕获异常，以免出现异常而导致断开连接
                await ctx.service.registry.goregistry(user, pwd);
            }
        )
        ctx.body = result;
    }
}
module.exports = RegistryController;
