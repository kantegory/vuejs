import Vue from 'vue'
import Router from 'vue-router'
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
      component: Home
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
