import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Header from 'base/Header/Header'

import Admin from '@/components/admin/admin' //后台首页
import Agent from '@/components/agent/agent' //代理商管理
import School from '@/components/school/school' //学校管理
import Account from '@/components/account/account' //账户管理
import Examine from '@/components/examine/examine' //审核管理
import Security from '@/components/security/security' //安全管理
import AddManager from '@/components/addManager/addManager' //添加管理员
import DetailManager from '@/components/detailManager/detailManager' //管理员详情
import AddStudent from '@/components/AddStudent/AddStudent' //添加学生
import DetailStudent from '@/components/detailStudent/detailStudent' //管理员详情
import AddTeacher from '@/components/AddTeacher/AddTeacher' //添加教师
import DetailTeacher from '@/components/detailTeacher/detailTeacher' //教师详情
import ReqManager from '@/components/reqManager/reqManager' //邀请管理员
import ExamineTeacher from '@/components/examineTeacher/examineTeacher' //教师审核详情
import ExamineStudent from '@/components/examineStudent/examineStudent' //学生审核详情
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/admin', //后台主页面
    name: 'admin',
    component: Admin,
    children: [{
        path: '/', //代理商管理
        name: 'agent',
        component: Agent
      },
      {
        path: 'school', //学校管理
        name: 'school',
        component: School
      },
      {
        path: 'account', //账号管理
        name: 'account',
        component: Account
      },
      {
        path: 'examine', //审核管理
        name: 'examine',
        component: Examine
      },
      {
        path: 'security', //安全设置
        name: 'security',
        component: Security
      }, {
        path: 'addManager', //添加管理员
        name: 'addManager',
        component: AddManager

      }, {
        path: 'detailManager', //管理员详情
        name: 'detailManager',
        component: DetailManager

      }, {
        path: 'addStudent', //添加学生
        name: 'addStudent',
        component: AddStudent
      }, {
        path: 'detailStudent', //学生详情
        name: 'detailStudent',
        component: DetailStudent
      }, {
        path: 'addTeacher', //添加教师
        name: 'addTeacher',
        component: AddTeacher

      }, {
        path: 'detailTeacher', //教师详情
        name: 'detailTeacher',
        component: DetailTeacher
      }, {
        path: 'reqManager', //邀请管理员
        name: 'reqManager',
        component: ReqManager
      },
      { //学生审核详情
        path: 'examineStudent',
        name: 'examineStudent',
        component: ExamineStudent
      },
      { //教师审核详情
        path: 'examineTeacher',
        name: 'examineTeacher',
        component: ExamineTeacher
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/header',
    name: 'Header',
    component: Header
  }]
})
