<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="教师申请" name="1">
            <teacher-table-list></teacher-table-list>
            <pages></pages>
        </el-tab-pane>
        <el-tab-pane label="学生申请" name="2">
            <student-table-list></student-table-list>
            <pages></pages>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
//当前是选项卡组件
import TeacherTableList from '@/components/examine/teacher-table-list/teacher-table-list'
import StudentTableList from '@/components/examine/student-table-list/student-table-list'
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
        TeacherTableList,
        StudentTableList,
        Pages
    }
}
</script>
<style lang="less" scoped>

</style>
