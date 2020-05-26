import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import router from './router/index'
import store from './store/store.js'
import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    this.$store.commit('initNIM')
    this.$store.commit('initMD5')
  },
}).$mount('#app')

Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies;  //配置时候prototype.$这里的名字自己定义不是固定是cookie
// this.$cookies.config("1min")