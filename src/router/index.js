import Vue from 'vue'
import Router from 'vue-router'

import DatePicker from 'base/datePicker/datePicker';//时间选择器
import Admin from '@/components/admin/admin'    //后台首页

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DatePicker',
      component: DatePicker
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
