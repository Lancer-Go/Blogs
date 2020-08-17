<template>
  <div class="wrap">
    <div class="mask-bg">
      <div class="mask">
        <div class="nav">
          <h3 style="color: deepskyblue">网站博客登录</h3>
        </div>
        <el-form class="mask-box" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="40px">
          <el-form-item label="账号" prop="user" class="item-pad">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" class="item-pad">
            <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
          </el-form-item>
          <div class="button-style">
            <el-button class="btn" @click="goHome">登录</el-button>
            <el-button class="btn" @click="goRegistery">注册</el-button>
          </div>
          <el-button type="warning" icon="el-icon-star-off" circle @click="jumpHome" style="margin-left: 165px;width:70px">我的</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

  import {Base64} from 'js-base64';
  import CryptoJS from 'crypto-js'
  import cookie from '../public/util';
  var OK=false;
  export default {
    props:{
    },
    components:{
    },
    data(){
      //validator定义,可选择采用最新的vue-form进行对表单验证
      const checkUser = async (rule, value, callback)=>{
        if(!value){
          OK=false;
          callback(new Error("请输入账号"))
        }else if(value.length<6){
          OK=false;
          callback(new Error("账号要不少于6位"))
        }
        else{
          OK=true;
          callback()
        }
      }
      const validatePass = async (rule, value, callback) => {
        const reg= /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/
        const checkpass = new RegExp(reg)
        if (value === '') {
          OK=false;
          callback(new Error('请输入密码'));
        }else if(!checkpass.test(value)){
          OK=false;
          callback(new Error("请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"))
        } else{
          OK=true;
          callback()
        }
      }
      return {
        ruleForm:{
          user:'',
          pwd:''
        },
        rules:{
          user:[
            {validator:checkUser,trigger:'blur'},
          ],
          pwd:[
            {validator:validatePass,trigger:'blur'}
          ]
        },
      }
    },
    computed:{
    },
    methods:{
      goHome(){
        let that=this;
        let user=this.ruleForm.user;
        let pwd=this.ruleForm.pwd;
        const encrypt = (word,key) => {//加密
          key = CryptoJS.enc.Utf8.parse(key);
          const srcs = CryptoJS.enc.Utf8.parse(word);
          const encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7 // 后台用的是pad.Pkcs5,前台对应为Pkcs7
          });
          return encrypted.toString();
        }
        if(OK){
          pwd=encrypt(this.ruleForm.pwd,'pass')
          this.$axios
            .post("/api/goLogin",{
            user:user,
            pwd:pwd
          })
            .then(res=>{//使用that指针指向this，因为在then情况下指针this会改变方向，变为undefinded
            console.log(res);//暂未解决第一次无法入正确的数据，第二次才能进行登陆
           if(res.status===200){
             this.$message({
               message:'登陆成功',
               type:'success'
             })
             this.$router.push({path:'/blog'});
           }
           else{
             this.$message({
               message:'登陆失败',
               type:"error"
             })
             this.$router.push({path:'/login'});
           }
            /*if(window.sessionStorage.getItem('token')){
              request.defaults.headers.common['Authorization'] = 'Bearer'+ window.sessionStorage.getItem('token');
            }
            window.sessionStorage.setItem('token','')//需要修改
            */
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          this.$message({
            message:"账号密码输入规则有误~",
            type:"warning"
          })
        }
      },
      goRegistery(){
        this.$router.push({path:"/registry"});
      },
      jumpHome(){
        if(!cookie.getCookie('token')){
          this.$message({
            message:"您还未登陆哟~",
            type:"warning"
          })
          this.$router.push({
            path: '/login'
          });
        }else{
          this.$router.push({
            path: '/blog'
          });
        }
      }
    },
    created(){
    },
    mounted(){

    }
  }
</script>
<style scoped lang="">
  .mask-bg{
    background-image: url(./images/bg1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
  }
  .mask{
    width:400px;
    height:350px;
    background: white;
    border-radius: 20px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .nav{
    width:100%;
    height:50px;
    display: flex;
    justify-content:center;
    align-items: center;
    padding:5px 0;
    margin-top:1px;
  }
  .mask-box{
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
  }

  .btn{
    width:150px;
    padding: 10px 10px;
    background: 0;
    bottom:30px;
    background: deepskyblue;
    color:white;
    border-radius: 5px;
    border:0;
  }
  .item-pad{
    padding: 10px;
  }
  .button-style{
    padding: 10px;
    margin-left: 40px;
  }
</style>
