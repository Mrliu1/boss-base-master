import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import {appRouter} from './router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // saveScrollPosition: true,
  base: '/lims-ui/',
  routes: [
    ...appRouter,
    {
      path: '/',
      redirect: '/home',
      name: 'home',
      component: Main
    },
    {
      path: '/home',
      name: 'home',
      component: Main
    }
  ]
})
