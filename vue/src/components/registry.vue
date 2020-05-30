<template>
  <div class="wrap">
    <div class="mask-bg">
      <div class="mask">
        <div class="nav">
          <h3 style="color: deepskyblue;text-align: center">网站博客注册</h3>
        </div>
        <el-form class="mask-box" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="账号" prop="user"style="padding: 10px 0;">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" style="padding: 10px 0;">
            <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwd1" style="padding: 10px 0;">
            <el-input type="password" v-model="ruleForm.pwd1" show-password></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="goLogin">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import request from "axios";
  import CryptoJS from 'crypto-js'
  var OK = false;
  export default {
    props: {},
    components: {},
    data() {
      var checkRUser = (rule, value, callback)=>{
        if(!value){
          OK=false;
          callback(new Error("请输入账号"))
        }else if(value.length<6){
          OK=false
          callback(new Error("账号要不少于6位"))
        } else{
          OK=true
          callback()
        }
      }
      var validateRPass = (rule, value, callback) => {
        const reg= /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/
        if (value === '') {
          OK=false;
          callback(new Error('请输入密码'));
        }else if(!reg.test(value)){
          OK=false;
          callback(new Error("请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"))
        } else{
          OK=true;
          callback()
        }
      }
      var validateRPass2 = (rule, value, callback) => {
        if (value === '') {
          OK=false;
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          OK=false;
          callback(new Error('两次输入密码不一致!'));
        } else {
          OK=true;
          callback();
        }
      };
      return {
        ruleForm:{
          user:'',
          pwd:'',
          pwd1:'',
        },
        rules:{
          user:[
            {validator:checkRUser,trigger:'blur'},
          ],
          pwd:[
            {validator:validateRPass,trigger:'blur'}
          ],
          pwd1:[
            {validator:validateRPass2,trigger:'blur'}
          ]
        },
      };
    },
    computed: {},
    methods: {
      goLogin() {
        const encrypt = (word,key) => {
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
          this.ruleForm.pwd1=encrypt(this.ruleForm.pwd,'pass')
          request.post("/api/goRegistry", {
              user: this.ruleForm.user,
              pwd: this.ruleForm.pwd,
            }).then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$router.history.go(-1);
                alert("注册成功");
              } else {
                this.ruleForm.pwd='';
                this.ruleForm.pwd1='';
                alert("注册失败");
              }
            });
        }else{
          alert("请输入符和规则的账号密码！")
        }
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style scoped lang="">
  .mask-bg {
    background-image: url(./images/bg2.jpg);
    background-size: cover; /* 重点二 */
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
  .mask {
    width: 500px;
    height: 350px;
    background: white;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .nav {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  .mask-box {
    width: 430px;
    height: 200px;
  }
  .group {
    width: 100%;
    height: 80px;
    padding:0px 20px;
  }
  .group .el-input{
    width:270px;
    margin-top:28px;
  }
  .btn {
    width: 200px;
    padding: 10px 10px;
    background: 0;
    position: absolute;
    left:32%;
    bottom: 20px;
    background: deepskyblue;
    color: white;
    border-radius: 10px;
    border: 0;

  }
</style>
