// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Validator from 'vue-validator'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'
import axios from 'axios'
import cookie from './public/util'
import {Base64} from 'js-base64';

Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(Validator);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state:{
    userId:'',
    token:{}// 获取token，若本地存在token就获取
  }
})

//路由拦截
router.beforeEach((to,from,next)=>{
  console.log("路由拦截")
  if(to.meta.requiresAuth){
    let token = cookie.getCookie('token');
    if(token){
      let str = token.split('.')[1]//取得相应需要的信息
      console.log(str)//token
      let user = JSON.parse(Base64.decode(str))
      store.state.userId=user.user_id;//还有个user_name没有设置
      console.log(user)//这是user的信息，一个对象
      next();
    } else{
      alert("无用户信息，请重新登陆")
      next({
        path:'/login'
      })
    }
  } else{
    next();//不需要token验证
  }
})
axios.interceptors.request.use(//http request 拦截器，添加token到header
  config=>{
    let token = cookie.getCookie('token');
    console.log(token)//这个是token
    if(token){
      config.headers.authorization = token
    }
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(//http response 拦截器，添加token到header
  response=>{
    return response
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login'
          }).then()
      }
    }
    return Promise.reject(error.response.data)
  })
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
