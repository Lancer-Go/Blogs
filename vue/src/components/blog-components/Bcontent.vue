<template>
  <div style="width:1200px;height:200px;display: flex;flex-direction: row">
    <div class="app">
      <el-input v-model="form.title" placeholder="请输入题目"></el-input>
      <div class="edit">
        <el-dropdown class="btn">
          <el-button title="标题" class="btn">H</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-button @click="headLineMode('<h1>')" >H1</el-button>
            <el-button @click="headLineMode('<h2>')" >H2</el-button>
            <el-button @click="headLineMode('<h3>')" >H3</el-button>
            <el-button @click="headLineMode('<h4>')" >H4</el-button>
            <el-button @click="headLineMode('<h5>')" >H5</el-button>
            <el-button @click="headLineMode('<p>')" >正文</el-button>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="btn">
          <el-button title="颜色" class="btn">颜色更改</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-button @click="colorRange('red')" >红</el-button>
            <el-button @click="colorRange('yellow')">黄</el-button>
            <el-button @click="colorRange('blue')">蓝</el-button>
            <el-button @click="colorRange('black')">黑</el-button>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-on:click="blackMode" class="btn" title="加粗"><strong>B</strong></el-button>
        <el-button v-on:click="italicMode" class="btn" title="斜体"><i>I</i></el-button>
        <el-popover
          placement="bottom"
          width="400"
          trigger="click"
          >
          <el-input placeholder="输入链接" v-model="components_.link_"></el-input>
          <el-button round v-on:click="linkMode" id="btn3">添加</el-button>
          <el-button slot="reference" class="btn" title="链接">链接</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          width="400"
          trigger="click"
          >
          <el-input placeholder="输入链接" v-model="components_.pho_"></el-input>
          <el-button round v-on:click="phoMode" id="btn4">添加</el-button>
          <el-button slot="reference" class="btn" title="图片">图片</el-button>
        </el-popover>
        <el-button v-on:click="indentMode" class="btn" title="缩进">缩进</el-button>
        <el-button v-on:click="underlineMode" class="btn" title="下划线">下划线</el-button>
        <el-button v-on:click="strikeThroughMode" class="btn" title="删除线">删除线</el-button>
      </div>
      <div id="reachEdit" class="reachEdit" contenteditable="true" title="" >
        <!--{{user_id}}访问父组件的属性，需要父子传值-->
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="6" class="click_btn">
          <el-button @click="saveArticle('保存')">保存</el-button>
          <el-button @click="saveArticle('发布')">发布</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import request from "axios"
    export default {
        name: "Bcontent",
      props:["user_id"],//父传值给子组件，注意名字要相同
      data(){
          return{
            form:{
              user:this.user_id,
              title:'',
              article:'',
              isPublish:false
            },
            msg:'文章内容组件',
            components_:{
              link_:'',
              pho_:''
            },
          }
      },
      methods:{
        headLineMode(select){//标题选择
          document.execCommand('formatBlock',false,select);
        },
        colorRange(select){ //颜色选择器
          document.execCommand('forecolor',false,select);
        },
        blackMode(){//加粗
          document.execCommand('bold');
        },
        italicMode(){//斜体
          document.execCommand('italic')
        },
        linkMode(){//超链接
          let Bsuccess = document.execCommand('createlink',false,this.components_.link_);
          if(Bsuccess)
            this.components_.link_="";
        },
        phoMode(){//插入图片
          let Bsuccess = document.execCommand('inserthtml',false,'<img src="'+this.components_.pho_+'">');
          if(Bsuccess){
            this.components_.pho_="";
          }
        },
        indentMode(){//缩进
          document.execCommand('indent');
        },
        strikeThroughMode(){//删除线
          document.execCommand('strikeThrough');
        },
        underlineMode(){//下划线
          document.execCommand('underline');
        },

        saveArticle(item){
          console.log(this.form.user);
          let article=document.getElementById("reachEdit");
          this.form.article=article.innerHTML;
          this.form.isPublish = item === '发布';//文章发布与否
          request.post('/api/blog',{
            userId:this.form.user,
            title:this.form.title,
            article:this.form.article,
            isPublish:this.form.isPublish
          }).then((res)=>{
            console.log(res);
            if(res.status===401){
              this.$message({
                message:"保存失败",
                type:"error"
              })
            }
            else{
              this.$message({
                message:"保存成功",
                type:"success"
              })
            }
          })
        },
      },
      computed:{
      }
    }

</script>

<style scoped>
  .app{
    width:900px;
    height:500px;
    display:flex;
    flex-direction: column;
  }
  .reachEdit{
    background-color: white ;
    width:899px;
    height:100%;
    border:1px solid #ccc;
    border-radius: 0 0 5px 5px;
    text-align: left;
    opacity: 0.7;
    outline:none;
    overflow: auto;
  }
  .btn{
    margin: 0;
    width:100px;
    height:50px;
  }
  .edit{
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .click_btn{
    display: flex;
    justify-content: space-around;
  }
</style>
