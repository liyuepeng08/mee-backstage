import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Header from 'base/Header/Header'

import Admin from '@/components/admin/admin' //后台首页
import Agent from '@/components/agent/agent' //代理商管理
import School from '@/components/school/school' //学校管理
import Examine from '@/components/examine/examine' //审核管理
import Security from '@/components/security/security' //安全管理
import AddManager from '@/components/addManager/addManager' //添加管理员
import ModifyManager from '@/components/addManager/modifyManager' //修改管理员
import DetailManager from '@/components/detailManager/detailManager' //管理员详情
import AddStudent from '@/components/AddStudent/AddStudent' //添加学生
import ModifyStudent from '@/components/AddStudent/modifyStudent' //修改学生

import DetailStudent from '@/components/detailStudent/detailStudent' //管理员详情
import AddTeacher from '@/components/AddTeacher/AddTeacher' //添加教师 
import ModifyTeacher from '@/components/AddTeacher/modifyTeacher' //添加教师
import DetailTeacher from '@/components/detailTeacher/detailTeacher' //教师详情
import ReqManager from '@/components/reqManager/reqManager' //邀请管理员

import TeacherManage from '@/components/teacherManage/teacherManage' //教师管理列表页
import StudentManage from '@/components/studentManage/studentManage' //学生管理列表页
import AdminUser from '@/components/adminUser/adminUser' //管理员管理列表页
import StudentExamine from '@/components/studentExamine/studentExamine' //学生审核列表页
import TeacherExamine from '@/components/teacherExamine/teacherExamine' //教师审核列表页

import ExamineTeacherDel from '@/components/examineTeacherDel/examineTeacherDel' //教师审核详情
import ExamineStudentDel from '@/components/examineStudentDel/examineStudentDel' //学生审核详情
import CourseManage from '@/components/courseManage/courseManage' //课程管理
import NewCourseDetail from '@/components/courseManage/newCourseDetail' //新建课程详情
import NewCourseUpload from '@/components/courseManage/newCourseUpload' //新建课程上传
import UploadVideo from '@/components/courseManage/uploadVideo' //视频上传
import UploadWord from '@/components/courseManage/UploadWord' //课件上传

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
        path: 'modifyManager/:uid', //修改管理员
        name: 'modifyManager',
        component: ModifyManager

      }, {
        path: 'detailManager/:uid', //管理员详情
        name: 'detailManager',
        component: DetailManager
      }, {
        path: 'addStudent', //添加学生
        name: 'addStudent',
        component: AddStudent
      }, {
        path: 'modifyStudent/:uid', //修改学生
        name: 'modifyStudent',
        component: ModifyStudent
      }, {
        path: 'detailStudent/:uid', //学生详情
        name: 'detailStudent',
        component: DetailStudent
      }, {
        path: 'addTeacher', //添加教师
        name: 'addTeacher',
        component: AddTeacher

      }, {
        path: 'modifyTeacher/:uid', //修改教师
        name: 'modifyTeacher',
        component: ModifyTeacher

      }, {
        path: 'detailTeacher/:uid', //教师详情
        name: 'detailTeacher',
        component: DetailTeacher
      }, {
        path: 'reqManager', //邀请管理员
        name: 'reqManager',
        component: ReqManager
      },
      { //学生审核详情
        path: 'examineStudentDel',
        name: 'examineStudentDel',
        component: ExamineStudentDel
      },
      { //教师审核详情
        path: 'examineTeacherDel',
        name: 'examineTeacherDel',
        component: ExamineTeacherDel
      },
      {
        path: 'reqManager', //邀请页面
        name: 'reqManager',
        component: ReqManager
      }, {
        path: "studentManage", //学生管理列表
        name: "studentManage",
        component: StudentManage
      },
      {
        path: "adminUser", //管理员管理列表
        name: "adminUser",
        component: AdminUser
      },
      {
        path: 'studentExamine', //学生审核列表
        name: 'studentExamine',
        component: StudentExamine
      }, {
        path: 'teacherExamine', //教师审核列表
        name: 'teacherExamine',
        component: TeacherExamine
      },
      {
        path: 'courseManage', //课程管理
        name: 'courseManage',
        component: CourseManage,
        children: [{ //新建课程详情
          path: 'newCourseDetail',
          name: 'newCourseDetail',
          component: NewCourseDetail
        }, { //新建课程上传
          path: 'newCourseUpload',
          name: 'newCourseUpload',
          component: NewCourseUpload,
          children: [{ //视频上传
            path: 'uploadVideo',
            name: 'uploadVideo',
            component: UploadVideo
          }, {
            path: 'uploadWord', //课件上传
            name: 'uploadWord',
            component: UploadWord
          }]
        }]
      }, {
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
