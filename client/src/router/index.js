import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
// import jobview from '@/components/jobview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    }
  ]
})
