<template>
  <el-menu
    :default-active="$route.path"
    router
    @select="navClick"
    text-color="#666666"
    style="border: none;"
  >
    <el-menu-item style="padding-left: 20px;" index="/admin">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      首页
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/admin/adminUser">管理员管理</el-menu-item>
        <el-menu-item index>机构管理</el-menu-item>
        <el-menu-item index="/admin/teacherManage">教师管理</el-menu-item>
        <el-menu-item index="/admin/studentManage">学生管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i></i>
        <span>资源管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/admin/courseManage">课程管理</el-menu-item>
        <el-menu-item index>试卷管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item style="padding-left: 20px;" index="/admin/classManage">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      班级管理
    </el-menu-item>

    <el-submenu index="3">
      <template slot="title">
        <i></i>
        <span>审核管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/teacherExamine">教师审核</el-menu-item>
        <el-menu-item index="/admin/studentExamine">学生管理</el-menu-item>
        <el-menu-item index>课程审核</el-menu-item>
        <el-menu-item index>考卷审核</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item style="padding-left: 20px;" index="/admin">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      <i></i>
      <span>设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
//当前是 导航组件
export default {
  data() {
    return {
      index: "0"
    };
  },
  mounted() {
    // console.log(this.$route.path)
  },
  methods: {
    navClick(index, indexPath) {
      console.log("index: " + index + " ; indexPath: " + indexPath);
    }
  }
};
</script>
<style lang="less">
.el-submenu .el-menu-item {
  min-width: 0px;
}
.el-menu-item.is-active {
  background-color: #f4f8ff;
}
.el-submenu .el-menu-item {
  padding: 0px;
}
.el-menu-item-group__title {
  padding: 0px;
}
// .el-menu {
//     background: none;
//     border-right: none;
// }
// .el-menu-item {
//     padding: 0;
// }
// .el-menu-item a {
//     color: #c9d0ff;
//     font-size: 14px;
// }
// .el-menu-item {
//     box-sizing: border-box;
//     text-align: center;
//     color: #c9d0ff;
// }
// .el-menu-item.is-active {
//     color: #fff;
// }

// .el-menu-item a {
//     display: block;
// }
// .el-menu-item:hover {
//     color: #fff;
// }

// .el-menu-item:focus {
//     background-color: #4BD3B7;
// }
</style>

