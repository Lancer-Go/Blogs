import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Registry from '@/components/registry'
import Blog from '@/components/blog'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path:'/login',
      name:'login',
      component: resolve=>(require(["@/components/login"],resolve))
      //component:resolve=>(require(["@/components/login"],resolve))，懒路由
    },
    {
      path:'/registry',
      name:'registry',
      component: resolve=>(require(["@/components/registry"],resolve))
      //component: resolve=>(require(["@/components/registry"],resolve))
    },
    {
      path:'/blog',
      name:'blog',
      component: Blog,
      meta:{
        requiresAuth:true
      }
    }
  ]
})
export default router;
