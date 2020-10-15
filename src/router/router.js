import Vue from 'vue'
import Router from 'vue-router'
// import Home from "../views/home/home";
import verifyList from '../views/verify-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'verifyList',
      component: verifyList
    }
  ]
})
