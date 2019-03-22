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
            <!-- <el-button
                class="addBtn teachBtn"
                type="primary"
                icon="el-icon-share"
                @click="invite"
            >邀请</el-button>-->
            <new-search @getSearchData="searchData"></new-search>
        </div>
        <el-table class="studentInfo" :data="tableData">
            <el-table-column prop="realName" label="名称"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="class" label="所在班级"></el-table-column>
            <el-table-column prop="mechanism" label="所属机构"></el-table-column>
            <el-table-column prop="registerTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="detailMsg(scope)">详情</el-button>
                    <el-button type="text" size="small" @click="modifyMsg(scope)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteMsg(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// import Pages from "../pages/pages";
import NewSearch from "../newSearch/newSearch";
export default {
    data() {
        return {
            tableData: []
        };
    },
    mounted() {
        this.getStudentList()
    },
    methods: {
        // 获得学生信息列表
        getStudentList() {
            let tid = sessionStorage.getItem('tid'),
                params = { role: 2, pageIndex: 1, pageSize: 10 }; // used for testing
            this.axios
                .get("/tenant/user/list/" + tid, {
                    params: { params }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code == 0) {
                            this.tableData = res.data.data.list;
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                });
        },
        // 获得搜索信息
        searchData(data) {
            if (data[0] == null) {
                this.$alert('未查询到指定信息', {
                    dangerouslyUseHTMLString: true
                });
                this.getStudentList();
            } else {
                this.tableData = data;
            }

        },
        deleteMsg(scope) {
            this.$confirm(
                "确定要删除" + scope.row.realName + "用户吗？",
                "删除管理员",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                let tid = sessionStorage.getItem('tid'),
                    params = { tid: tid, uid: scope.row.uid };
                this.axios.get("/tenant/user/delete", {
                    params: { params }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code == 0) {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        } else {
                            alert(res.data.msg);
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                });
            });
        },
        detailMsg(scope) {
            this.$router.push({
                path: `detailStudent/${scope.row.uid}`
            });
        },
        modifyMsg(scope) {
            // 跳转到编辑
            this.$router.push({
                path: `modifyStudent/${scope.row.uid}`
            });
        },
        addStudent() {
            this.$router.push({ path: "addStudent" });
        },
        importBtn() {
            alert("你好啊");
        },
        invite() {
            this.$router.push({ path: "reqManager" });
        }
    },
    components: {
        // Pages,
        NewSearch
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
