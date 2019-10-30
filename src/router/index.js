import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/components/Home'
import Tasks from '@/components/Tasks'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next('/home') : next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next('/home') : next()
      }
    }
  ]
})
