<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理员管理" name="first">
            <table-list></table-list>
        </el-tab-pane>
        <el-tab-pane label="教师管理" name="second">教师管理</el-tab-pane>
        <el-tab-pane label="学生管理" name="third">学生管理</el-tab-pane>
    </el-tabs>
</template>
<script>
//当前是选项卡组件
import TableList from '@/components/table/table'
export default {
    data() {
        return {
            activeName2: ''
        }
    },
    methods: {
        handleClick() {

        }
    },
    components: {
        TableList
    }
}
</script>
<style lang="less" scoped>

</style>
