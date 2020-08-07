import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Registry from '@/components/registry'
import Blog from '@/components/blog'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',

    },
    {
      path:'/login',
      name:'login',
      component: Login
      //component:resolve=>(require(["@/components/login"],resolve))，懒路由，但是会出现组件第一次失效的状况
    },
    {
      path:'/registry',
      name:'registry',
      component: Registry
      //component: resolve=>(require(["@/components/registry"],resolve))
    },
    {
      path:'/blog',
      name:'blog',
      component: Blog
    }
  ]
})
