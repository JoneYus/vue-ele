import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import router from './router/index'
import store from './store/store.js'
import axios from 'axios'

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