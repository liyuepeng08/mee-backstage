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
import ExamineTeacher from '@/components/examineTeacherDel/examineTeacherDel' //教师审核详情
import ExamineStudent from '@/components/examineStudentDel/examineStudentDel' //学生审核详情
import CourseManage from '@/components/courseManage/courseManage'   //课程管理
import NewCourseDetail from '@/components/courseManage/newCourseDetail'      //新建课程详情
import NewCourseUpload from '@/components/courseManage/newCourseUpload'        //新建课程上传
import UploadVideo from '@/components/courseManage/uploadVideo'            //视频上传

import TeacherManage from '@/components/teacherManage/teacherManage' //教师管理

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/admin', //后台主页面
    name: 'admin',
    component: Admin,
    children: [{
        path: 'agent', //代理商管理
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
      },
      {
        path: 'reqManager', //邀请页面
        name: 'reqManager',
        component: ReqManager
      },
      {
        path: 'courseManage',     //课程管理
        name: 'courseManage',
        component: CourseManage,
        children: [{            //新建课程详情
          path: 'newCourseDetail',
          name: 'newCourseDetail',
          component: NewCourseDetail
        }, {                            //新建课程上传
          path: 'newCourseUpload',
          name: 'newCourseUpload',
          component: NewCourseUpload,
          children: [{          //视频上传
            path: 'uploadVideo',
            name: 'uploadVideo',
            component: UploadVideo
          }]
        }]
      }
        ,{
          path: "teacherManage",
          name: "teacherManage",
          component: TeacherManage
        }
    ]
  }, {
    path: '/',
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
