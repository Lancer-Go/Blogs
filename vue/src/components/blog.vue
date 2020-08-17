<template>
    <el-container id="app">
      <el-header style="padding: 0">
        <el-row>
          <el-col :span="24">
            <el-menu
              :default-active="active_Index"
              class="el-menu-demo"
              mode="horizontal"
              @select=""
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="">
              <el-menu-item index="1">发布文章</el-menu-item>
              <el-submenu index="2">
                <template slot="title">优秀文章</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项1</el-menu-item>
                  <el-menu-item index="2-4-2">选项2</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="3" disabled>功能尚未开发</el-menu-item>
              <el-menu-item index="4">尚未开发</el-menu-item>
              <el-submenu index="5" style="float:right">
                  <template slot="title">{{user_id}}</template><!--这里使用外部送来的数据{{name}}}-->
                  <el-menu-item index="5-1">账号信息(未开发)</el-menu-item><!--这里显示账号-->
                  <el-menu-item index="5-2">修改密码(未开发)</el-menu-item>
                  <el-menu-item index="5-3" @click="quit">退出登陆</el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-header>
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
export default {
  name: 'App',
  components: {Bcontent},//局部挂载组件
  data () {
    return {
      user_id:this.$store.state.userId,//暂时还未实现通信
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
