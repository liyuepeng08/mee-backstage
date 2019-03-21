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
            <el-button class="teachBtn" type="primary" icon="el-icon-share" @click="invite">邀请</el-button>
        </div>
        <el-table class="tablelInfo" :data="tableData">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column prop="classes" label="所在班级"></el-table-column>
            <el-table-column prop="subject" label="教授科目"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg">详情</el-button>
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
export default {
    data() {
        return {
            tableData: [{
                name: '爱谁谁',
                telephone: '18897689866',
                classes: '猜猜看',
                subject: '高数',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',

            }, {
                name: '爱谁谁',
                telephone: '18897689866',
                classes: '猜猜看',
                subject: '高数',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',

            }, {
                name: '爱谁谁',
                telephone: '18897689866',
                classes: '猜猜看',
                subject: '高数',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',

            }, {
                name: '爱谁谁',
                telephone: '18897689866',
                classes: '猜猜看',
                subject: '高数',
                mechanism: '开普勒实验小学北京海淀分校',
                time: '2019-02-19',

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
                path: '/admin/detailTeacher'
            })
        },
        addTeacher() {
            this.$router.push({
                path: '/admin/addTeacher'
            })
        },
        invite() {//邀请
            this.$router.push({
                path: '/admin/reqManager'
            })
        }
    },
    components: {
        Pages
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
