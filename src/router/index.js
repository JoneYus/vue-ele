import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Index from '../components/Index.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/index', component: Index },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})
export default router;