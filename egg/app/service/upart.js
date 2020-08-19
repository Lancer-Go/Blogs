const Service = require('egg').Service;
const Blog = require("../db/Blog");
class UpArtService extends Service {
    async UpArt (userId,title,article,isPublish){
        let find = await Blog.findOne({
            where:{
                userId:userId,
                title:title
            },
            raw:true   //直接返回数据结果
        })
        if(find){
            let dat= await Blog.update({
                article:article,
                isPublish:isPublish
                }, {
                    where:{
                        userId:userId,
                        title:title
                    }
                })
            if(dat){
                return{
                    code:1,
                    message:'更改成功',
                    //  dat//一般不返回，容易信息泄露
                }
            }
            else{
                return{
                    code:-1,
                    message:'更改失败'
                }
            }
        } else{
            let dat = await Blog.create({
                userId:userId,
                title:title,
                article:article,
                isPublish: isPublish
            })
            if(dat){
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
}
module.exports=UpArtService;
