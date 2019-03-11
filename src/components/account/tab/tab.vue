<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理员管理" name="1">
            <el-button type="primary" icon="el-icon-plus" class="new-add">新增</el-button>
            <el-button type="primary" icon="el-icon-share" class="new-add">邀请</el-button>
            <table-list></table-list>
            <pages></pages>
        </el-tab-pane>
        <el-tab-pane label="教师管理" name="2">
            <table-list></table-list>
            <pages></pages>
        </el-tab-pane>
        <el-tab-pane label="学生管理" name="3">
            <el-button type="primary" icon="el-icon-plus" class="new-add">新增</el-button>
            <el-button type="primary" icon="el-icon-share" class="new-add">邀请</el-button>
            <el-button type="primary" icon="el-icon-upload2" class="new-add">批量新增</el-button>
            <a href="#" style="color: blue"><i class="el-icon-download"></i>下载模板</a>
            <table-list></table-list>
            <pages></pages>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
//当前是选项卡组件
import TableList from '@/components/account/table-list/table-list'
import Pages from '@/components/pages/pages'
export default {
    data() {
        return {
            activeName2: '1'
        }
    },
    methods: {
        handleClick() {

        }
    },
    components: {
        TableList,
        Pages
    }
}
</script>
<style lang="less" scoped>

</style>
