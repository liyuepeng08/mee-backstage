<template>
    <el-breadcrumb class="position pos1" separator-class="el-icon-arrow-right">
        <i class="posIcon el-icon-location-outline"></i>
        <el-breadcrumb-item :to="{ path: '/' }">校园管理</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增教师</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
//当前组件是 面包屑导航
export default {
    
}
</script>
<style lang="less" scoped>
.position{
    margin:20px 0 20px 20px;
    padding-left: 14px;
    .posIcon{
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>

