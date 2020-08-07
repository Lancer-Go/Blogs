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

Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(Validator);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state:{
    userId:''
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
