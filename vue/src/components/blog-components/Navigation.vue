<template>
<div>
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
          >
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
</div>
</template>

<script>
import cookie from '../../public/util'
import router from "../../router";
export default {
  name: "Navigation",
  data(){
    return{
      active_Index:'1',
      user_id:this.$store.state.userId
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

<style scoped>

</style>
