<template>
  <el-menu
    :default-active="$route.path"
    router
    @select="navClick"
    text-color="#666666"
    style="border: none;"
  >
    <el-menu-item style="padding-left: 20px;" index="/admin" class="index">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      <i class="_icon"></i>
      <span>首页</span>
    </el-menu-item>

    <el-submenu index="1" class="user">
      <template slot="title">
        <i class="_icon"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/admin/adminUser" style="padding-left: 60px;">管理员管理</el-menu-item>
        <el-menu-item index  style="padding-left: 60px;">机构管理</el-menu-item>
        <el-menu-item index="/admin/teacherManage"  style="padding-left: 60px;">教师管理</el-menu-item>
        <el-menu-item index="/admin/studentManage"  style="padding-left: 60px;">学生管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2" class="resources">
      <template slot="title">
        <i class="_icon"></i>
        <span>资源管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/admin/courseManage"  style="padding-left: 60px;">课程管理</el-menu-item>
        <el-menu-item index  style="padding-left: 60px;">试卷管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item style="padding-left: 20px;" index="/admin/classManage" class="classic">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      <i class="_icon"></i>
      <span>班级管理</span>
    </el-menu-item>

    <el-submenu index="3" class="examine">
      <template slot="title">
        <i class="_icon"></i>
        <span>审核管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/teacherExamine" style="padding-left: 60px;">教师审核</el-menu-item>
        <el-menu-item index="/admin/studentExamine" style="padding-left: 60px;">学生管理</el-menu-item>
        <el-menu-item index style="padding-left: 60px;">课程审核</el-menu-item>
        <el-menu-item index style="padding-left: 60px;">考卷审核</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item style="padding-left: 20px;" index="/admin" class="setting">
      <!-- <router-link to="/admin">代理商管理</router-link> -->
      <i class="_icon"></i>
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
<style lang="less" scoped>
.el-submenu /deep/ .el-menu-item {
  min-width: 0px;
  padding: 0;
  min-width: 0;
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
.el-menu /deep/ .is-opened /deep/ .el-submenu__title span {
  color: #5693ff;
}

.el-menu /deep/ .el-menu-item ._icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 15px;
}

.el-menu /deep/ .el-submenu .el-submenu__title ._icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 15px;
}

.el-menu /deep/ .el-menu-item.index i {
  background: url(./indexn.png) center no-repeat;
}

.el-menu /deep/ .index.is-active i {
  background: url(./indexs.png) center no-repeat;
}

.el-menu /deep/ .el-submenu.user .el-submenu__title ._icon {
  background: url(./usern.png) center no-repeat;
}

.el-menu /deep/ .user.is-opened .el-submenu__title ._icon {
  background: url(./users.png) center no-repeat;
}

.el-menu /deep/ .el-submenu.resources .el-submenu__title ._icon {
  background: url(./resourcen.png) center no-repeat;
}

.el-menu /deep/ .resources.is-opened .el-submenu__title ._icon {
  background: url(./resources.png) center no-repeat;
}



.el-menu /deep/ .el-menu-item.classic i {
  background: url(./classicn.png) center no-repeat;
}

.el-menu /deep/ .classic.is-active i {
  background: url(./classics.png) center no-repeat;
}



.el-menu /deep/ .el-submenu.examine .el-submenu__title ._icon {
  background: url(./examinen.png) center no-repeat;
}

.el-menu /deep/ .examine.is-opened .el-submenu__title ._icon {
  background: url(./examines.png) center no-repeat;
}


.el-menu /deep/ .el-menu-item.setting i {
  background: url(./settingn.png) center no-repeat;
}

.el-menu /deep/ .setting.is-active i {
  background: url(./settings.png) center no-repeat;
}

</style>

