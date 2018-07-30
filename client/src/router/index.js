import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import newdata from '@/components/newdata'
import demo from '@/components/demo'
// import table from '@/components/table'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/newdata',
      name: 'newdata',
      component: newdata
    }
  ]
})
