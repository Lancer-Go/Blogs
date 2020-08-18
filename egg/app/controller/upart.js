'use strict';
const Controller = require('egg').Controller;
class UploadController extends Controller{
    async uploadFn(){
        const {ctx,service}=this;
        let {userId,title,article,isPublish}=ctx.request.body;
        let result=await service.upart.UpArt(userId,title,article,isPublish);
        //核对捕获异常
        ctx.runInBackground(async ()=>{
                //这里捕获异常，以免出现异常而导致断开连接
                await ctx.service.upart.UpArt(userId,title,article,isPublish);
            }
        )
        ctx.body=result;
    }
}
module.exports=UploadController;
