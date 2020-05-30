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
          <p><button class="btn" @click="goHome">登录</button></p>
          <p><button class="btn" @click="goRegistery">注册</button></p>
          <el-button type="warning" icon="el-icon-star-off" circle @click="jumpHome">我的</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

  import request from "axios"
  import CryptoJS from 'crypto-js'
  var OK=false;
  export default {
    props:{
    },
    components:{
    },
    data(){
      var checkUser = (rule, value, callback)=>{
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
      var validatePass = (rule, value, callback) => {
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
          pwd:'',
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
        const encrypt = (word,key) => {//加密
          var key = CryptoJS.enc.Utf8.parse(key);
          var srcs = CryptoJS.enc.Utf8.parse(word);
          var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7 // 后台用的是pad.Pkcs5,前台对应为Pkcs7
          });
          return encrypted.toString();
        }
        if(OK){
          this.ruleForm.pwd=encrypt(this.ruleForm.pwd,'pass')
          request.post("/api/goLogin",{
            user:this.ruleForm.user,
            pwd:this.ruleForm.pwd
          }).then((res)=>{
            console.log(res);
            window.localStorage.setItem('token',res.token)
            if(res.data.code === -1){
              setTimeout(()=>{this.$router.push('/login');},1000)
              alert("登陆失败");
              this.rules.user=this.ruleForm.user;
              this.ruleForm.pwd='';
            }else{
              this.$cookies.set("usercookie","GH1.1.1689020474.1484362313","1h");//1小时过期
              alert("登陆成功");
              this.$router.push('/home');
            }
          })
        }else{
          alert("账号密码输入规则有误~")
        }
      },
      goRegistery(){
        setTimeout(()=>{this.$router.push('/registry')},1500)
      },
      jumpHome(){
        let usercookie = this.$cookies.get("usercookie");
        if(!usercookie){
          alert("你还没有登陆噢~")
          this.$router.push({
            path: '/login'
          });
        }else if(usercookie==='GH1.1.1689020474.1484362313'){
          this.$router.push({
            path: '/home'
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
    height:330px;
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
  }
  .group{
    padding:0px 20px;
  }
  .group .el-input {
    margin-top:28px;
    width:280px
  }

  .btn{
    width:150px;
    padding: 10px 10px;
    background: 0;
    left: 32%;
    bottom:30px;
    background: deepskyblue;
    color:white;
    border-radius: 5px;
    border:0;
  }
  .item-pad{
    padding: 10px;
  }
</style>
