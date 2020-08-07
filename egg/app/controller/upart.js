'use strict';
const Controller = require('egg').Controller;
class UploadController extends Controller{
    async uploadFn(){
        const {ctx,service}=this;
        let {userId,title,article,isPublish}=ctx.request.body;
        let result=await service.upart.UpArt(userId,title,article,isPublish);
        ctx.body=result;
    }
}
module.exports=UploadController;
