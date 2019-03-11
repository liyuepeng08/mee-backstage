<template>
    <el-menu :default-active="$route.path" router>
        <el-menu-item style="padding-left: 0px;" index="/admin">
            <!-- <router-link to="/admin">代理商管理</router-link> -->
            代理商管理
        </el-menu-item>
        <el-menu-item style="padding-left: 0px;" index="/admin/school">
            <!-- <router-link to="/admin/school">学校管理</router-link> -->
            学校管理
        </el-menu-item>
        <el-menu-item style="padding-left: 0px;" index="/admin/account">
            <!-- <router-link to="/admin/account">账号管理</router-link> -->
            账号管理
        </el-menu-item>
        <el-menu-item style="padding-left: 0px;" index="/admin/examine">
            <!-- <router-link to="/admin/examine">审核管理</router-link> -->
            审核管理
        </el-menu-item>
        <el-menu-item style="padding-left: 0px;" index="/admin/security">
            <!-- <router-link to="/admin/security">安全设置</router-link> -->
            安全设置
        </el-menu-item>
    </el-menu>
</template>
<script>
//当前是 导航组件
export default {
    data() {
        return {
            index: "0"
        }
    },
    mounted() {
        console.log(this.$route.path)
    }
}
</script>
<style lang="less" scoped>
.el-menu {
    background: none;
    border-right: none;
}
.el-menu-item {
    padding: 0;
}
.el-menu-item a {
    color: #c9d0ff;
    font-size: 14px;
}
.el-menu-item {
    box-sizing: border-box;
    text-align: center;
    color: #c9d0ff;
}
.el-menu-item.is-active {
    background-color: #4BD3B7;
    border-left: 10px #fff solid;
    color: #fff;
}

.el-menu-item a {
    display: block;
}
.el-menu-item:hover {
    background-color: #4BD3B7;
    border-left: 10px #fff solid;
    color: #fff;
}

.el-menu-item:focus {
    background-color: #4BD3B7;
    border-left: 10px #fff solid;
}
</style>

