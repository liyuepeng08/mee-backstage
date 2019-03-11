<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理员管理" name="1">
            <div class="butt">
                <el-button type="primary" icon="el-icon-plus" class="new-add" @click="addAdmin">新增</el-button>
                <el-button type="primary" icon="el-icon-share" class="new-add">邀请</el-button>
            </div>
            
            <admin-table-list></admin-table-list>
            <pages></pages>
        </el-tab-pane>
        <el-tab-pane label="教师管理" name="2">
            <div class="butt">
                <el-button type="primary" icon="el-icon-plus" class="new-add" @click="addTeacher">新增</el-button>
                <el-button type="primary" icon="el-icon-share" class="new-add">邀请</el-button>
            </div>
            
            <teacher-table-list></teacher-table-list>
            <pages></pages>
        </el-tab-pane>
        <el-tab-pane label="学生管理" name="3">
            <div class="butt">
                <el-button type="primary" icon="el-icon-plus" @click="addStudent">新增</el-button>
                <el-button type="primary" icon="el-icon-share">邀请</el-button>
                <el-button type="primary" icon="el-icon-upload2" class="upload-butt">
                    批量新增
                    <input type="file" name="" id="upload-file">
                </el-button>
                <a href="#" style="color: blue"><i class="el-icon-download"></i>下载模板</a>
            </div>
            
            <student-table-list></student-table-list>
            <pages></pages>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
//当前是选项卡组件
import TeacherTableList from '@/components/account/teacher-table-list/teacher-table-list'      //教师管理列表
import AdminTableList from '@/components/account/admin-table-list/admin-table-list'     //管理员管理列表
import StudentTableList from '@/components/account/student-table-list/student-table-list'       //学生管理列表
import Pages from '@/components/pages/pages'
export default {
    data() {
        return {
            activeName2: '1'
        }
    },
    methods: {
        handleClick() {

        },
        addAdmin() {
            this.$router.push({
                path: '/admin/addManager'
            })
        },
        addTeacher() {
            this.$router.push({
                path: '/admin/addTeacher'
            })
        },
        addStudent() {
            this.$router.push({
                path: '/admin/addStudent'
            })
        }
    },
    components: {
        TeacherTableList,
        AdminTableList,
        StudentTableList,
        Pages
    }
}
</script>
<style lang="less" scoped>
.butt {
    margin-bottom: 10px;
}
.upload-butt {
    position: relative;
}
#upload-file {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
