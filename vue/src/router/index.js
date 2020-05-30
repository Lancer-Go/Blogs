import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Registry from '@/components/registry'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/registry',
      name:'registry',
      component: Registry
    },
    {
      path:'/home',
      name: 'home',
      component: HelloWorld
    }
  ]
})
