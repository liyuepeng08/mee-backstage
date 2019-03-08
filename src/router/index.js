import Vue from 'vue'
import Router from 'vue-router'

import DatePicker from 'base/datePicker/datePicker';//时间选择器
import Admin from '@/components/admin/admin'    //后台首页
import Agent from '@/components/agent/agent'    //代理商管理
import School from '@/components/school/school'   //学校管理
import Account from '@/components/account/account'    //账户管理
import Examine from '@/components/examine/examine'      //审核管理
import Security from '@/components/security/security'     //安全管理

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DatePicker',
      component: DatePicker
    },
    {
      path: '/admin',   //后台主页面
      name: 'admin',
      component: Admin,
      children: [
        {     
          path: '/',    //代理商管理
          name: 'agent',
          component: Agent
        },
        {
          path: 'school',   //学校管理
          name: 'school',
          component: School
        },
        {
          path: 'account',   //账号管理
          name: 'account',
          component: Account
        },
        {
          path: 'examine',  //审核管理
          name: 'examine',
          component: Examine
        },
        {
          path: 'security',   //安全设置
          name: 'security',
          component: Security
        }
      ]
    }
  ]
})
