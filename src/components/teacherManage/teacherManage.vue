<template>
    <div class="teacherManager">
        <p class="topNav">
            <span>用户管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">教师管理</span>
        </p>
        <h2>教师管理</h2>
        <div class="butt">
            <el-button
                class="teachBtn active"
                type="primary"
                icon="el-icon-plus"
                @click="addTeacher"
            >新建</el-button>
            <!-- <el-button class="teachBtn" type="primary" icon="el-icon-share" @click="invite">邀请</el-button> -->
            <new-search></new-search>
        </div>
        <el-table class="tablelInfo" :data="tableData">
            <el-table-column prop="realName" label="名称"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="classes" label="所在班级"></el-table-column>
            <el-table-column prop="subject" label="教授科目"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="registerTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pages/>
    </div>
</template>
<script>
import Pages from '../pages/pages'
import NewSearch from '../newSearch/newSearch'
export default {
    data() {
        return {
            tableData: [],
            uid: '',

        }
    },
    mounted() {
        this.getTeacherList()
    },
    methods: {
        getTeacherList() {
            let tid = 1,
                params = { role: 1, pageIndex: 1, pageSize: 10 };// used for testing
            this.axios.get('/tenant/user/list/' + tid, {
                params: { params }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code == 0) {
                        console.log(res.data.data);
                        this.tableData = res.data.data.list;
                    }
                }
            })
        },
        deleteMsg(scope) {
            this.$confirm('确定要删除' + scope.row.realName + '用户吗？', '删除管理员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = { "tid": 1, "uid": scope.row.uid };
                this.axios.get('/tenant/user/delete', {
                    params: { params }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            alert(res.data.msg)
                        }
                    }
                });

            })
        },
        detailMsg(scope) {
            this.$router.push({
                path: `detailTeacher/${scope.row.uid}`,               
            })
        },
        addTeacher() {
            this.$router.push({
                path: 'addTeacher'
            })
        },
        invite() {//邀请
            this.$router.push({
                path: 'reqManager'
            })
        }
    },
    components: {
        Pages,
        NewSearch
    }
};
</script>
<style lang="less">
.teacherManager {
    padding: 0 10px;
    .el-table th > .cell {
        font-weight: 700;
        color: #080808;
        padding-left: 30px;
    }
    .topNav {
        font-size: 12px;
        color: #a9a9a9;
        .active {
            color: #5693ff;
        }
    }
    h2 {
        font-size: 18px;
        color: #080808;
        margin-top: 29px;
    }
    .butt {
        margin-top: 31px;
        .teachBtn {
            width: 90px;
            height: 30px;
            color: #5693ff;
            background: #f8fafc;
            border-radius: 15px;
            border: solid 1px #5693ff;
            padding: 0;
        }
        .active {
            color: #fff;
            background-color: #5693ff;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
    }
    .tablelInfo {
        margin-top: 20px;
        border: 1px solid #f1f1f1;
        border-bottom: none;
        /deep/ tr {
            background: #fff;
        }
        /deep/ .el-table__row {
            td {
                padding-left: 20px;
            }
        }
    }
}
</style>
