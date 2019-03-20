<template>
    <div class="studentManager">
        <p class="topNav">
            <span>用户管理</span>
            <i class="el-icon-arrow-right"></i>
            <span class="active">学生管理</span>
        </p>
        <h2>学生管理</h2>
        <div class="butt">
            <el-button class="addBtn" type="primary" icon="el-icon-plus" @click="addStudent">新增</el-button>
            <el-button class="addBtn" type="primary" icon="el-icon-share" @click="importBtn">导入</el-button>
            <a href="#">
                <i class="el-icon-download"></i>下载模板
            </a>
            <el-button
                class="addBtn teachBtn"
                type="primary"
                icon="el-icon-share"
                @click="invite"
            >邀请</el-button>
        </div>
        <el-table class="studentInfo" :data="tableData">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="class" label="所在班级"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                mechanism: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                class: '二班'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                mechanism: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                class: '二班'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                mechanism: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                class: '二班'
            }, {
                date: '2016-05-02',
                name: '爱谁谁',
                nickname: '我是代理商',
                mechanism: '开普勒实验小学北京海淀分校',
                telephone: '18897689866',
                time: '2019-02-19',
                class: '二班'
            }]
        }
    },
    methods: {
        deleteMsg(scope) {
            this.$confirm('确定要删除' + this.tableData[scope.$index].name + '用户吗？', '删除管理员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
        },
        detailMsg(scope) {
            this.$router.push({
                path: '/admin/detailStudent'
            })
        },
        addStudent() {
            this.$router.push({ path: 'addStudent' })
        },
        importBtn() {
            alert("你好啊")
        },
        invite() {
            this.$router.push({ path: 'reqManager' })
        }
    }
};
</script>
<style lang="less">
.studentManager {
    padding: 0 10px;
    .el-table th > .cell {
        font-weight: 700;
        color: #080808;
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
        .addBtn {
            width: 90px;
            height: 30px;
            background: #5693ff;
            border-radius: 15px;
            border: solid 1px #5693ff;
            padding: 0;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
        .teachBtn {
            background: #f8fafc;
            color: #5693ff;
            margin-left: 20px;
        }
        .active {
            color: #fff;
            background-color: #5693ff;
            box-shadow: 0px 4px 6px 0px rgba(86, 147, 255, 0.4);
        }
        a {
            font-size: 12px;
            color: #5693ff;
        }
    }
    .studentInfo {
        margin-top: 20px;
        border: 1px solid #f1f1f1;
        /deep/ th {
            padding-left: 20px;
        }
        /deep/ .el-table__row {
            td {
                padding-left: 20px;
            }
        }
    }
}
</style>
