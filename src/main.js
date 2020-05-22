import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import router from './router/index'
import store from './store/store.js'

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    this.$store.commit('initNIM')
    this.$store.commit('initMD5')
  },
}).$mount('#app')

// import NIM from './SDK/NIM_Web_NIM_v7.6.0.js'
// Vue.prototype.$SDK = NIM
// console.log(this.$SDK)

// import Utils from './utils/Utils.js'
// Vue.use(Utils)
// Vue.prototype.$Utils = Utils