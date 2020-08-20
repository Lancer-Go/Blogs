<template>
    <el-container id="app">
        <Navigation></Navigation><!--导航栏-->
      <el-main class="main_">
        <el-row style="height: 80px"></el-row>
        <el-row type="flex" justify="center">
          <el-col :span="5"><div></div></el-col>
          <el-col :span="15"><Bcontent v-bind:user_id="user_id"></Bcontent></el-col><!--将父组件的value传到子组件中-->
          <el-col :span="4"><div></div></el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-col :span="24"><div></div></el-col>
      </el-footer>
    </el-container>
</template>

<script>
  import cookie from '../public/util'
  import Bcontent from "./blog-components/Bcontent";
  import router from "../router";
  import Navigation from "./blog-components/Navigation";
export default {
  name: 'App',
  components: {Navigation, Bcontent},//局部挂载组件
  data () {
    return {
      user_id:this.$store.state.userId,
      active_Index:'1'
    }
  },
  methods:{
    quit(){
      cookie.delCookie('token')
      this.$message({
        message:this.$store.state.userId+' 已退出 ',
        type:"success"
      })
      router.push({path:'/login'})
    }
  }
}
</script>

<style>
  body{
    height:100%;
    margin: 0;
    padding: 0;
  }
  #app{
    padding: 0;
    width:100%;
    height:100%;
    background-image: url("./images/bg3.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position:absolute;
  }
  .main_{
    padding: 0;
    height:500px;
  }
</style>
