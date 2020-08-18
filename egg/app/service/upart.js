const Blog = require("../db/Blog");
const Service = require('egg').Service;
class UpArtService extends Service {
    async UpArt (userId,title,article,isPublish){
        let dat = await Blog.create({
            userId:userId,
            title:title,
            article:article,
            isPublish: isPublish
        })
        if(dat.toJSON()){
            return{
                code:1,
                message:'上传成功',
                //  dat//一般不返回，容易信息泄露
            }
        }
        else{
            return{
                code:-1,
                message:'上传失败'
            }
        }

    }
}
module.exports=UpArtService;
